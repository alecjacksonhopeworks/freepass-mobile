import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GlobalTheme } from "../constants/global-themes";
import LabeledTextInput from "../components/TextInputs";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/login-banner.png")} style={styles.banner} />
        <Image source={require("../../assets/freepass-logo.png")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Log Into Your Account</Text>
      </View>
      <View style={styles.loginContainer}>

          <LabeledTextInput
            inputStyle={{ borderColor: GlobalTheme.colors.primary }}
            label="Email"
            placeholder="Enter email..."
            placeholderTextColor={GlobalTheme.colors.primary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <LabeledTextInput
            inputStyle={{ borderColor: GlobalTheme.colors.primary }}
            label="Password"
            placeholder="Enter password..."
            placeholderTextColor={GlobalTheme.colors.primary}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
          
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalTheme.colors.white,
    paddingTop: GlobalTheme.spacing.lg,
  },
  button: {
    backgroundColor: GlobalTheme.colors.secondary,
    ...GlobalTheme.typography.medium,
    paddingVertical: 11,
    borderRadius: GlobalTheme.radius.lg,
    alignItems: "center",
    marginTop: GlobalTheme.spacing.lg,
    width: "75%"
  },
  buttonText: {
    color: GlobalTheme.colors.white,
    ...GlobalTheme.typography.medium, 
  },
  forgotAccountContainer: {
    width: "100%",
    marginTop: 50,
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
    display: "flex",
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