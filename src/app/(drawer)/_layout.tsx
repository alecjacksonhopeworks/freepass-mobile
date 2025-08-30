// app/(menu)/_layout.tsx
import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes"; // adjust path if needed
import { FreepassLogoImage } from "@components/Images";

export default function MenuLayout() {
  return (
    <Drawer
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
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="user-guide"
        options={{
          title: "User Guide",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="your-calandar"
        options={{
          title: "Your Calendar",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}