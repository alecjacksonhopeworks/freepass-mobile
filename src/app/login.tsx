import { View, Image, StyleSheet } from "react-native";
import { GlobalTheme } from "../constants/global-themes";
import LoginForm from "../components/forms/LoginForm";
import { StyledText } from "../components/StyledText";

export default function Login() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/login-banner.png")}
          style={styles.banner}
        />
        <Image source={require("../../assets/freepass-logo.png")}
          style={styles.logo}
        />
        <StyledText  text="Welcome Back!" color="white" size="large"/>
        <StyledText text="Log Into Your Account" color="white"/>
      </View>

      <View style={styles.loginContainer}>
        <LoginForm />
        <View style={styles.forgotAccountContainer}>
          <StyledText text="FORGOT YOUR PASSWORD?" color="primary" size="small"/>
          <View style={styles.divider} />
          <View style={styles.createAccountTextContainer}>
            <StyledText text="Don't have an account?" color="primaryDark"/>
            <StyledText text="Sign Up!" color="primary"/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
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
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 50,
    backgroundColor: GlobalTheme.colors.white,
    paddingVertical: GlobalTheme.spacing.lg,
  },
  forgotAccountContainer: {
    width: "100%",
    alignItems: "center",
    gap: GlobalTheme.spacing.xs,
  },
  divider: {
    width: "75%",
    height: 1,
    backgroundColor: GlobalTheme.colors.primary,
  },
  createAccountTextContainer: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.xs,
  },
});