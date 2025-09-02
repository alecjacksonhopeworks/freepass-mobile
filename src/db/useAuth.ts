import { useEffect } from 'react';
import { SupabaseClient } from '@db/supabase';
import { useAuthStore } from '@db/store/useAuthStore';


export function useAuth() {
  const { session, setSession, clear } = useAuthStore((state) => ({
    session: state.session,
    setSession: state.setSession,
    clear: state.clear,
  }));

  useEffect(() => {
    // 1. Initialize store from any existing session
    const initialize = async () => {
      const stored = await SupabaseClient.auth.getSession();
      if (stored.data.session) {
        setSession(stored.data.session, stored.data.session.user);
      }
    };
    initialize();

    // 2. Subscribe to auth state changes
    const { data: listener } = SupabaseClient.auth.onAuthStateChange(
      (_event, newSession) => {
        if (newSession) {
          setSession(newSession, newSession.user);
        } else {
          clear();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await SupabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setSession(data.session!, data.session!.user);
    return data.session;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await SupabaseClient.auth.signUp({ email, password });
    if (error) throw error;
    if (data.session) {
      setSession(data.session, data.session.user);
    }
    return data;
  };

  const signOut = async () => {
    await SupabaseClient.auth.signOut();
    clear();
  };

  return {
    session,
    user: session?.user ?? null,
    signIn,
    signUp,
    signOut,
  };
}