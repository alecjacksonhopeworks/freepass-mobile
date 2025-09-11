import { getAuthRedirect } from "@db/hooks/auth";
import { useAuthStore } from "@db/store/useAuthStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);
  const router = useRouter();

  useEffect(() => {
    if(session && signUpState){
      let route = getAuthRedirect(signUpState)
      if (route) router.replace(route)
    }
  }, [session, signUpState]);

  // If not logged in → go login
  return (
      <Stack screenOptions={{ headerShown: false }}/>
  );
}
