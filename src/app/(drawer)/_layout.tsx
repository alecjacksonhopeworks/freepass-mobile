// app/(menu)/_layout.tsx
import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes"; // adjust path if needed
import { FreepassLogoImage } from "@components/Images";
import { CustomDrawerContent } from "@components/CustomDrawerContent";

export default function MenuLayout() {
  return (
    <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: GlobalTheme.colors.primaryDark,
          },
          headerTintColor: GlobalTheme.colors.white,
          headerTitle: () => (
            <FreepassLogoImage size={40}/>
          ),
          headerTitleAlign: "center",
          drawerType: "front",
          drawerActiveTintColor: GlobalTheme.colors.primary,
          drawerInactiveTintColor: GlobalTheme.colors.gray,
          drawerLabelStyle: {
            ...GlobalTheme.typography.medium,
            color: GlobalTheme.colors.white
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