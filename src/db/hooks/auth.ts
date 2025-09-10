import { useMutation } from "@tanstack/react-query";
import { SupabaseClient } from "@db/supabase/client";
import { useAuthStore } from "@db/store/useAuthStore";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from 'react'
import { SignUpState, PrivateUser } from "@db/supabase/types";

// TODO: test auth hooks, link with application and add auth types

// TODO: implement email STMP sign up, check on setting in Supabase Authorization tab

export function useSignUp() {
  const setSession = useAuthStore((s) => s.setSession);
  const setPrivateUser = useAuthStore((s) => s.setPrivateUser);
  const setUserSettings = useAuthStore((s) => s.setUserSettings);

  const router = useRouter()

  return useMutation({
    mutationFn: async (data: {email: string, password: string, fullname: string}) => {
      const { email, password, fullname } = data;

      const { data: authData, error: authError } = await SupabaseClient.auth.signUp({ email, password });
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("User ID missing");

      const { data: privateUser, error: privateUserError } = await SupabaseClient
        .from("private_user")
        .insert([{ id: userId, email, full_name: fullname }])
        .select()
        .single()
      if (privateUserError) throw privateUserError;

      const { data: userSettings, error: userSettingsError } = await SupabaseClient
        .from("user_settings")
        .insert([{ user_id: userId }])
        .select()
        .single();
      if (userSettingsError) throw userSettingsError;

      return {
        authData,
        privateUser,
        userSettings,
      };
    },
     onSuccess: ({ authData, privateUser, userSettings }) => {
      // Save everything in the store
      if (authData.session) setSession(authData.session, authData.session.user);
      setPrivateUser(privateUser);
      setUserSettings(userSettings);

      router.replace("/signup/choose-role");
    },
  });
}

export function useSignIn() {
  const setSession = useAuthStore((s) => s.setSession);
  const setPrivateUser = useAuthStore((s) => s.setPrivateUser);
  const setUserSettings = useAuthStore((s) => s.setUserSettings);

  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      console.log('MUTATE SIGN IN')
      const { data, error } = await SupabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      const userId = data.user?.id;
      if (!userId) throw new Error("User ID missing");

      const { data: privateUser, error: privateUserError } = await SupabaseClient
        .from("private_user")
        .select("*")
        .eq("id", userId)
        .single();
      if (privateUserError) throw privateUserError;

      const { data: userSettings, error: userSettingsError } = await SupabaseClient
        .from("user_settings")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (userSettingsError) throw userSettingsError;
      
      console.log({ authData: data, privateUser, userSettings })

      return { authData: data, privateUser, userSettings };
    },
    onSuccess: ({ authData, privateUser, userSettings }) => {
      console.log("SIGN IN SUCCESS")

      if (authData.session) {
        setSession(authData.session, authData.session.user);
      }
      setPrivateUser(privateUser);
      setUserSettings(userSettings);

      router.replace("/home");
    },
  });
}

export function useSignOut() {
  const clear = useAuthStore((s) => s.clear);

  return useMutation({
    mutationFn: async () => {
      const { error } = await SupabaseClient.auth.signOut();
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      clear();
    },
  });
}

const SIGN_UP_ROUTES: Record<string, string> = {
  choose_role: "/signup/choose-role",
  pick_categories: "/signup/pick-categories",
  create_profile: "/signup/create-profile",
  //add_resource_request: "/signup/add-resource-request",
  complete: ""
};

export function useRedirectBasedOnLogin() {
  const router = useRouter();
  const session = useAuthStore((store) => store.session)
  const privateUser = useAuthStore((store) => store.privateUser)

  useEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }

    if (!privateUser) throw new Error("Private user data not loaded but user is logged in."); 

    const signUpState = privateUser.sign_up_state || "complete";
    const route = SIGN_UP_ROUTES[signUpState] || '';

    if (signUpState != "complete")
      router.replace(route);
  }, [session, privateUser]);
}


export function useUpdateSignUpState(onComplete?: () => void) {
  const user = useAuthStore((store) => store.user);
  const setPrivateUser = useAuthStore((store) => store.setPrivateUser);
  const userId = user?.id

  return useMutation({
    mutationFn: async (newState: SignUpState) => {
      if (userId) throw new Error("User ID is required");

      const { data, error } = await SupabaseClient
        .from("private_user")
        .update({ sign_up_state: newState })
        .eq("id", userId)
        .select()
        .single<PrivateUser>();

      if (error) throw error;

      return data;
    },
    onSuccess: (data) => {
      setPrivateUser(data);
      if (onComplete) onComplete();
    },
  });
}