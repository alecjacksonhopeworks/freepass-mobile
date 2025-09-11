import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { UserSettings, PrivateUser, SignUpState } from "@db/supabase/types";

interface AuthState {
  session: Session | null;
  user: User | null;
  privateUser: PrivateUser | null;
  userSettings: UserSettings | null;
  signUpState: SignUpState | null;
  setSession: (session: Session | null, user: User | null) => void;
  setPrivateUser: (privateUser: PrivateUser | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  setSignUpState: (signUpState: SignUpState) => void;
  clearAuthStore: () => void;
  setAuthData: (
    session: Session | null,
    privateUser: PrivateUser,
    userSettings: UserSettings,
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  privateUser: null,
  userSettings: null,
  signUpState: null,

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
