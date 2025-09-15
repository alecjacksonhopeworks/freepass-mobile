// app/signup/_layout.tsx
import { Stack, usePathname, Redirect } from "expo-router";
import { useAuthStore } from "@db/store/useAuthStore";
import { getAuthRedirect } from "@db/hooks/auth";

export default function SignUpLayout() {
  const currentPathname = usePathname();
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);


   if (!session || !signUpState) 
      return <Redirect href='/login'/>

    const redirectRoute = getAuthRedirect(signUpState!);

    if (redirectRoute && currentPathname !== redirectRoute) 
      return <Redirect href={redirectRoute}/>

  return <Stack screenOptions={{ headerShown: false }} />;
}
