import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function MenuLayout() {
  let isLoggedIn = false; // Replace with real auth check
  console.log("MenuLayout rendered");
  
  // If logged in → go home
  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  // If not logged in → go login
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
    </Stack>
  );
}