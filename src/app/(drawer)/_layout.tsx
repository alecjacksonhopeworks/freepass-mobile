import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { GlobalTheme } from "@constants/global-themes";
import { FreepassLogoImage } from "@components/Images";
import { CustomDrawerContent } from "@components/CustomDrawerContent";
import { useAuthStore } from "@db/store/useAuthStore";
import { useRouter } from "expo-router";
import { getAuthRedirect } from "@db/hooks/auth";

export default function MenuLayout() {
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);
  const router = useRouter();

  useEffect(() => {
    console.log("use effect MenuLayout");
    if (!session) {
    //TODO: Refactor Redirect code

      router.replace("/login");
      return;
    }

    if (signUpState != "complete") {
      let route = getAuthRedirect(signUpState!);
      console.log('MenuLayout going to route', route)
      if (route) router.replace(route);
    }
  }, [signUpState]);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: GlobalTheme.colors.primaryDark,
        },
        headerTintColor: GlobalTheme.colors.white,
        headerTitle: () => <FreepassLogoImage size={40} />,
        headerTitleAlign: "center",
        drawerType: "front",
        drawerActiveTintColor: GlobalTheme.colors.primary,
        drawerInactiveTintColor: GlobalTheme.colors.gray,
        drawerLabelStyle: {
          ...GlobalTheme.typography.medium,
          color: GlobalTheme.colors.white,
        },
        drawerContentStyle: {
          backgroundColor: GlobalTheme.colors.primaryDark,
        },
        drawerStyle: {
          backgroundColor: GlobalTheme.colors.primaryDark,
          width: 260,
        },
      }}
    />
  );
}
