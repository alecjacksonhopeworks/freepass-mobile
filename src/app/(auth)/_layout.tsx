import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
  let isLoggedIn = false; // Replace with real auth check
  console.log("AuthLayout rendered");
  
  // If logged in → go home
  if (isLoggedIn) {
    return <Redirect href="/" />;
  }
  

  // If not logged in → go login
  return (
      <Stack screenOptions={{ headerShown: false }}/>
  );
}
