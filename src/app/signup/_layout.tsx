// app/signup/_layout.tsx
import { useEffect } from "react";
import { useRouter, Stack, usePathname } from "expo-router";
import { useAuthStore } from "@db/store/useAuthStore";
import { getAuthRedirect } from "@db/hooks/auth";

export default function SignUpLayout() {
  const router = useRouter();
  const currentPathname = usePathname();
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);

  console.log("SignUpLayout", "currentPathname", currentPathname);

  useEffect(() => {
    console.log("use effect SignUpLayout");
    if (!session || !signUpState) {
      router.replace("/login");
      return;
    }

    const redirectRoute = getAuthRedirect(signUpState);

    if (redirectRoute && currentPathname !== redirectRoute) {
      router.replace(redirectRoute);
    }
  }, [signUpState]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
