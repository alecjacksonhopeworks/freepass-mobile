import { Stack, Redirect } from "expo-router";
import { GlobalTheme } from "../../constants/global-themes";
import { View, StyleSheet } from "react-native";
import { StyledText } from "../../components/StyledText";
import { BannerImage, FreepassLogoImage } from "../../components/Images";

export default function AuthLayout() {
  let isLoggedIn = false; // Replace with real auth check
  console.log("AuthLayout rendered");
  
  // If logged in → go home
  if (isLoggedIn) {
    return <Redirect href="/" />;
  }
  

  // If not logged in → go login
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BannerImage />
        <FreepassLogoImage />
        <StyledText text="Welcome Back!" color="white" font="large"/>
        <StyledText text="Log Into Your Account" color="white"/>
      </View>
      <Stack screenOptions={{ headerShown: false }}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalTheme.colors.background,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: GlobalTheme.colors.primary,
    paddingTop: GlobalTheme.spacing.xl,
    paddingBottom: GlobalTheme.spacing.md,
    gap: GlobalTheme.spacing.md
  }
});