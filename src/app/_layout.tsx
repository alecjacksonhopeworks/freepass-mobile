import { Stack, Redirect } from "expo-router";
import { GlobalTheme } from "../constants/global-themes";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar/>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: GlobalTheme.colors.primaryDark },
        headerTintColor: GlobalTheme.colors.white,
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </> 
  )
}