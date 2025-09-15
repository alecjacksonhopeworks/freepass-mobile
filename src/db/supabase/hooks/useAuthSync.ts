import { useEffect } from "react";
import { SupabaseClient } from "@db/supabase/client";
import { getPrivateUser, getUserSettings } from "@db/supabase/queries/user";
import { useAuthStore } from "@db/store/useAuthStore";
import { PrivateUser, UserSettings } from "@db/supabase/types";

async function fetchUserData(
  userId: string
): Promise<{ privateUser: PrivateUser; userSettings: UserSettings }> {
  const [privateUser, userSettings] = await Promise.all([
    getPrivateUser(userId),
    getUserSettings(userId),
  ]);

  return { privateUser, userSettings };
}

export function useAuthSync() {
  const { clearAuthStore, setAuthData, setAuthIsLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      SupabaseClient.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
          const { privateUser, userSettings } = await fetchUserData(
            session.user.id
          );
          setAuthData(session, privateUser, userSettings);
        } else {
          clearAuthStore();
        }
        setAuthIsLoading(false);
      });
    };
    init();

    const { data: listener } = SupabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const { privateUser, userSettings } = await fetchUserData(
            session.user.id
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
