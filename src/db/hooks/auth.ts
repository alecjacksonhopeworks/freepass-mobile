import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@db/store/useAuthStore";
import { useRouter } from "expo-router";
import { SignUpState } from "@db/supabase/types";
import {
  signIn,
  signOut,
  insertPrivateUser,
  insertUserSettings,
  getUserSettings,
  getPrivateUser,
  updatePrivateUser,
} from "@db/supabase/queries/user";

// TODO: test auth hooks, link with application and add auth types

// TODO: implement email STMP sign up, check on setting in Supabase Authorization tab

export function useSignUp(onComplete: () => void) {
  const setSession = useAuthStore((s) => s.setSession);
  const setPrivateUser = useAuthStore((s) => s.setPrivateUser);
  const setUserSettings = useAuthStore((s) => s.setUserSettings);
  const setSignUpState = useAuthStore((s) => s.setSignUpState);

  return useMutation({
    mutationFn: async ({
      email,
      password,
      fullname,
    }: {
      email: string;
      password: string;
      fullname: string;
    }) => {
      try {
        const authData = await signIn(email, password);
        const userId = authData.user?.id;

        if (!userId) throw new Error("User ID missing");

        const [privateUser, userSettings] = await Promise.all([
          insertPrivateUser(userId, email, fullname),
          insertUserSettings(userId),
        ]);

        return { authData, privateUser, userSettings };
      } catch (error) {
        throw error;
      }
    },
    onSuccess: ({ authData, privateUser, userSettings }) => {
      if (authData.session) setSession(authData.session, authData.session.user);
      setPrivateUser(privateUser);
      setUserSettings(userSettings);
      setSignUpState(privateUser.sign_up_state);

      onComplete();
    },
  });
}

export function useSignIn(onComplete?: () => void) {
  const setSession = useAuthStore((s) => s.setSession);
  const setPrivateUser = useAuthStore((s) => s.setPrivateUser);
  const setUserSettings = useAuthStore((s) => s.setUserSettings);
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const authData = await signIn(email, password);

        const userId = authData.user?.id;
        if (!userId) throw new Error("User ID missing");

        const [privateUser, userSettings] = await Promise.all([
          getPrivateUser(userId),
          getUserSettings(userId),
        ]);

        return { authData, privateUser, userSettings };
      } catch (error) {
        throw error;
      }
    },
    onSuccess: ({ authData, privateUser, userSettings }) => {
      if (authData.session) setSession(authData.session, authData.session.user);
      setPrivateUser(privateUser);
      setUserSettings(userSettings);

      if (onComplete) {
        onComplete();
      } else {
        router.replace("/home");
      }
    },
  });
}

export function useSignOut() {
  const clear = useAuthStore((s) => s.clearAuthStore);

  return useMutation({
    mutationFn: async () => {
      try {
        await signOut();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      clear();
    },
  });
}

const SIGN_UP_ROUTES: Record<SignUpState, string> = {
  choose_role: "/signup/choose-role",
  pick_categories: "/signup/pick-categories",
  create_profile: "/signup/create-profile",
  add_resource_request: "/signup/add-resource-request",
  complete: "/home",
};

export function getAuthRedirect(signUpState: SignUpState): string {
  return SIGN_UP_ROUTES[signUpState] || "";
}



export function useUpdateSignUpState(onComplete?: () => void) {
  const user = useAuthStore((store) => store.user);
  const setPrivateUser = useAuthStore((store) => store.setPrivateUser);
  const setSignUpState = useAuthStore((store) => store.setSignUpState);

  const userId = user?.id;

  return useMutation({
    mutationFn: async (newState: SignUpState) => {
      try {
        if (!userId) throw new Error("User ID is required");
        const privateUser = await updatePrivateUser(userId, {
          sign_up_state: newState,
        });
        return privateUser;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setPrivateUser(data);
      setSignUpState(data.sign_up_state);
      if (onComplete) onComplete();
    },
  });
}
