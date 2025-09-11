import { getAuthRedirect } from "@db/hooks/auth";
import { useAuthStore } from "@db/store/useAuthStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);
  const router = useRouter();

  useEffect(() => {
    console.log("use effect AuthLayout");
    //TODO: Refactor Redirect code
    if (session && signUpState) {
      let route = getAuthRedirect(signUpState);
            console.log('AuthLayout going to route', route)

      if (route) router.replace(route);
    }
  }, [signUpState]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
