import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { GlobalTheme } from "@constants/global-themes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicon } from "@constants/types";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

type TabInfo = {
  name: string;
  title: string;
  icon: string;
};

const tabs: TabInfo[] = [
  { name: "home", title: "Home", icon: "home" },
  { name: "chat", title: "Chat", icon: "chatbubble-ellipses" },
  { name: "courses", title: "Courses", icon: "book" },
  { name: "events", title: "Events", icon: "calendar" },
  { name: "faq", title: "FAQs", icon: "help-circle" },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GlobalTheme.colors.white,
        tabBarInactiveTintColor: GlobalTheme.colors.whiteInactive,
        tabBarStyle: {
          backgroundColor: GlobalTheme.colors.primary,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerLeft: () => (
          <DrawerToggleButton tintColor={GlobalTheme.colors.white} />
        ),
      }}
    >
      <Tabs.Screen name="(other)" options={{ href: null }} />

      {tabs.map((tab) => {
        const outlineIcon = `${tab.icon}-outline` as Ionicon;
        const icon = tab.icon as Ionicon;
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? icon : outlineIcon}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
