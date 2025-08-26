import { Stack, Redirect } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  // replace this with Supabase session check later
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If logged in → go home
  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  // If not logged in → go login
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
    </Stack>
  );
}