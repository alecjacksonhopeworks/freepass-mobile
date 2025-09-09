import { useMutation } from "@tanstack/react-query";
import { SupabaseClient } from "@db/supabase/client";
import { useAuthStore } from "@db/store/useAuthStore";
import { useRouter } from "expo-router";

// TODO: test auth hooks, link with application and add auth types

// TODO: implement email STMP sign up, check on setting in Supabase Authorization tab

export function useSignUp() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await SupabaseClient.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.session) setSession(data.session, data.session.user);
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