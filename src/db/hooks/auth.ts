import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@db/store/useAuthStore";
import { SignUpState } from "@db/supabase/types";
import {
  signIn,
  signOut,
  insertPrivateUser,
  insertUserSettings,
  updatePrivateUser,
  signUp,
} from "@db/supabase/queries/user";

// TODO: implement email STMP sign up, check on setting in Supabase Authorization tab

export function useSignUp(onComplete?: () => void) {
  const { setAuthData } = useAuthStore();

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
        const { session } = await signUp(email, password);

        if (!session) throw new Error("There was a problem signing in.");

        const userId = session.user?.id;

        console.log('signed up with ', userId, 'inserting settings an private')
        const [privateUser, userSettings] = await Promise.all([
          insertPrivateUser(userId, email, fullname),
          insertUserSettings(userId),
        ]);

        return { session, privateUser, userSettings };
      } catch (error) {
        console.log(
          "[db/hooks/auth.ts] Error in useSignUp:",
          (error as any)?.message || error
        );
        throw error;
      }
    },
    onSuccess: ({ session, privateUser, userSettings }) => {
      setAuthData(session, privateUser, userSettings);
      if (onComplete) onComplete();
    },
  });
}

export function useSignIn(onComplete?: () => void) {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        await signIn(email, password);
      } catch (error) {
        console.log(
          "[db/hooks/auth.ts] Error in useSignIn:",
          (error as any)?.message || error
        );
        throw error;
      }
    },
    onSuccess: () => {
      if (onComplete) onComplete();
    },
  });
}

export function useSignOut(onComplete?: () => void) {
  return useMutation({
    mutationFn: async () => {
      try {
        await signOut();
      } catch (error) {
        console.log(
          "[db/hooks/auth.ts] Error in useSignOut:",
          (error as any)?.message || error
        );
        throw error;
      }
    },
    onSuccess: () => {
      if (onComplete) onComplete();
    },
  });
}

const SIGN_UP_ROUTES: Record<SignUpState, string> = {
  choose_role: "/signup/choose-role",
  pick_categories: "/signup/pick-service-types",
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
        console.log(
          "[db/hooks/auth.ts] Error in useUpdateSignUpState:",
          (error as any)?.message || error
        );
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
