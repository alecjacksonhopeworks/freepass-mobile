import React from "react";
import { Drawer } from "expo-router/drawer";
import { GlobalTheme } from "@constants/global-themes";
import { CustomDrawerContent } from "@components/CustomDrawerContent";
import { useAuthStore } from "@db/store/useAuthStore";
import { Redirect } from "expo-router";
import { getAuthRedirect } from "@db/hooks/auth";
import { StyledText } from "@components/StyledText";

export default function MenuLayout() {
  const session = useAuthStore((store) => store.session);
  const signUpState = useAuthStore((store) => store.signUpState);
  console.log("rendering MenuLayout");

  if (!session) {
    console.log("MenuLayout redirect guard", "/login");
    return <Redirect href="/login" />;
  }


  if (signUpState != "complete") {
    let route = getAuthRedirect(signUpState!);
    console.log("MenuLayout redirect guard", route);
    if (route) return <Redirect href={route} />;
  }
  console.log("rendering MenuLayout complete");

    return (
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: GlobalTheme.colors.primary,
          },
          headerTintColor: GlobalTheme.colors.white,
          headerTitle: () => (
            <StyledText text="FreePass" font="title" color="white" />
          ),
          headerTitleAlign: "center",
          drawerType: "slide",
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
            backgroundColor: GlobalTheme.colors.primary,
            width: 300,
            paddingHorizontal: GlobalTheme.spacing.sm,
          },
        }}
      />
    );
  }

