// app/(menu)/_layout.tsx
import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "../../constants/global-themes"; // adjust path if needed

export default function MenuLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: GlobalTheme.colors.background,
        },
        headerTintColor: GlobalTheme.colors.primary,
        headerTitleStyle: {
          ...GlobalTheme.typography.medium,
          color: GlobalTheme.colors.primary,
        },
        drawerType: "front",
        drawerActiveTintColor: GlobalTheme.colors.primary,
        drawerInactiveTintColor: GlobalTheme.colors.gray,
        drawerLabelStyle: {
          ...GlobalTheme.typography.medium,
        },
      }}
    >
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