import { Tabs } from "expo-router";
import { GlobalTheme } from "../../../constants/global-themes";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GlobalTheme.colors.primary,
        tabBarInactiveTintColor: GlobalTheme.colors.primaryDark,
        tabBarStyle: {
          backgroundColor: GlobalTheme.colors.white,
          borderTopColor: GlobalTheme.colors.primary,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerLeft: () => <DrawerToggleButton tintColor={GlobalTheme.colors.white} />
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="faqs"
        options={{
          title: "FAQs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}