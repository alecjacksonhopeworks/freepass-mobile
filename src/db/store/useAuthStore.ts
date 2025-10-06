import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { UserSettings, PrivateUser, SignUpState } from "@db/supabase/types";

interface AuthState {
  session: Session | null;
  user: User | null;
  privateUser: PrivateUser | null;
  userSettings: UserSettings | null;
  signUpState: SignUpState | null;
  authIsLoading: boolean;
  setAuthIsLoading: (authIsLoading: boolean) => void;
  setSession: (session: Session | null, user: User | null) => void;
  setPrivateUser: (privateUser: PrivateUser | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  setSignUpState: (signUpState: SignUpState) => void;
  clearAuthStore: () => void;
  setAuthData: (
    session: Session | null,
    privateUser: PrivateUser | null,
    userSettings: UserSettings | null
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  privateUser: null,
  userSettings: null,
  signUpState: null,
  authIsLoading: true,
  setAuthIsLoading: (authIsLoading) => set({ authIsLoading }),

  setSession: (session, user) => set({ session, user }),
  setPrivateUser: (privateUser) => set({ privateUser }),
  setUserSettings: (userSettings) => set({ userSettings }),
  setSignUpState: (signUpState) => set({ signUpState }),

  clearAuthStore: () =>
    set({
      session: null,
      user: null,
      privateUser: null,
      userSettings: null,
      signUpState: null,
    }),

  setAuthData: (session, privateUser, userSettings) => {
    set({
      session,
      user: session?.user,
      privateUser,
      userSettings,
      signUpState: privateUser?.sign_up_state,
    });
  },
}));
