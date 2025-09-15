import { getAuthRedirect } from "@db/hooks/auth";
import { useAuthStore } from "@db/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  console.log("rendering AuthLayout");
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);

  if (session && signUpState) {
    const route = getAuthRedirect(signUpState);
    console.log("AuthLayout redirect guard", route);
    if (route) return <Redirect href={route} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  );
}
