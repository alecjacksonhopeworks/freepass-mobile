import { useEffect } from "react";
import { SupabaseClient } from "@db/supabase/client";
import { getPrivateUser, getUserSettings } from "@db/supabase/queries/user";
import { useAuthStore } from "@db/store/useAuthStore";
import { PrivateUser, UserSettings } from "@db/supabase/types";

async function fetchUserData(
  userId: string,
  email: string | undefined
): Promise<{ privateUser: PrivateUser | null; userSettings: UserSettings | null }> {
  const [privateUser, userSettings] = await Promise.all([
    getPrivateUser(userId, email),
    getUserSettings(userId),
  ]);

  return { privateUser, userSettings };
}

export function useAuthSync() {
  const { clearAuthStore, setAuthData, setAuthIsLoading } = useAuthStore();

  const init = async () => {
    try {
      const {
        data: { session },
      } = await SupabaseClient.auth.getSession();

      if (session) {
        const { privateUser, userSettings } = await fetchUserData(
          session.user.id,
          session.user?.email
        );
        setAuthData(session, privateUser, userSettings);
      } else {
        clearAuthStore();
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      clearAuthStore(); 
    } finally {
      setAuthIsLoading(false);
    }
  };

  useEffect(() => {
    init();

    const { data: listener } = SupabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const { privateUser, userSettings } = await fetchUserData(
            session.user.id,
            session.user?.email
          );
          setAuthData(session, privateUser, userSettings);
        } else {
          clearAuthStore();
        }
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);
}
