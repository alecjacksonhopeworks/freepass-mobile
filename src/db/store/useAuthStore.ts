import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { UserSettings, PrivateUser } from '@db/supabase/types'

interface AuthState {
  session: Session | null;
  user: User | null;
  privateUser: PrivateUser | null;
  userSettings: UserSettings | null;
  setSession: (session: Session | null, user: User | null) => void;
  setPrivateUser: (privateUser: PrivateUser | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  clear: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  privateUser: null,
  userSettings: null,

  setSession: (session, user) => set({ session, user }),
  setPrivateUser: (privateUser) => set({ privateUser }),
  setUserSettings: (userSettings) => set({ userSettings }),

  clear: () =>
    set({
      session: null,
      user: null,
      privateUser: null,
      userSettings: null,
    }),

  isLoggedIn: () => !!get().session && !!get().user,
}));