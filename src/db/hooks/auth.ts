import { useMutation } from "@tanstack/react-query";
import { SupabaseClient } from "@db/supabase/client";
import { useAuthStore } from "@db/store/useAuthStore";
import { useRouter } from "expo-router";

// TODO: test auth hooks, link with application and add auth types

// TODO: implement email STMP sign up, check on setting in Supabase Authorization tab

export function useSignUp() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: {email: string, password: string, fullname: string}) => {
      const { email, password, fullname } = data;

      const { data: authData, error: authError } = await SupabaseClient.auth.signUp({ email, password });
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("User ID missing");

      const { error: privateUserError } = await SupabaseClient.from('private_user').insert([{ id: userId, email, full_name: fullname }]);
      if (privateUserError) throw privateUserError;

      const { error: userSettingsError } = await SupabaseClient.from('user_settings').insert([{ user_id: userId }]);
      if (userSettingsError) throw userSettingsError;

      return authData;
    },
    onSuccess: (data) => {
      if (data.session) setSession(data.session, data.session.user);
      router.replace('/signup/choose-role')
    },
  });
}

export function useSignIn() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await SupabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      if (data.session) setSession(data.session, data.session.user);
      router.replace('/home')
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