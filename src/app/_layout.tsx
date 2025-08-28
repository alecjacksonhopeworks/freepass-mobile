import { Stack, Redirect } from "expo-router";
import { GlobalTheme } from "../constants/global-themes";
import { StatusBar } from "react-native";
import { FreepassLogoImage } from "../components/Images";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar/>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}