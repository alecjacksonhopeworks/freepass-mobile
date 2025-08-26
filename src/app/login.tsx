import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { GlobalTheme } from "../constants/global-themes";
import LoginForm from "../components/forms/login-form";

export default function Login() {

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/login-banner.png")} style={styles.banner} />
        <Image source={require("../../assets/freepass-logo.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Log Into Your Account</Text>
      </View>

      <View style={styles.loginContainer}>
          <LoginForm />
          <View style={styles.forgotAccountContainer}>
            <Text style={styles.forgotPasswordText}>FORGOT YOUR PASSWORD?</Text>
            <View style={styles.divider}/>
            <View style={styles.createAccountTextContainer}>
              <Text style={styles.createAccountText}>Don't have an account?</Text>
              <Text style={styles.signUpText}>Sign Up!</Text>
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
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: GlobalTheme.spacing.md,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: GlobalTheme.spacing.md,
  },
  welcomeText: {
    color: GlobalTheme.colors.white,
    ...GlobalTheme.typography.large,
    textAlign: "center",
    marginBottom: 5,
  },
  loginText: {
    color: GlobalTheme.colors.white,
    fontSize: 16,
    textAlign: "center",
    marginBottom: GlobalTheme.spacing.sm,
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
    gap: GlobalTheme.spacing.xs
  },
  forgotPasswordText: {
    color: GlobalTheme.colors.primary,
    ...GlobalTheme.typography.small,
    marginBottom: GlobalTheme.spacing.sm,
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
  createAccountText: {
    ...GlobalTheme.typography.medium,
    color: GlobalTheme.colors.primaryDark,
    textAlign: "center",
  },
  signUpText: {
    ...GlobalTheme.typography.medium,
    color: GlobalTheme.colors.primary,
    textAlign: "center",
  },
});