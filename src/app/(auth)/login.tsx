import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/global-themes";
import LoginForm from "../../components/forms/LoginForm";
import { StyledText } from "../../components/StyledText";
import { TextLink } from "../../components/TextLink";

export default function Login() {
  return (
    <View style={styles.container}>
      <LoginForm />
      <View style={styles.footerContainer}>
          <TextLink href="/reset-password" text="Forgot your password?" color="primaryDark" replace/>
        <View style={styles.divider} />
        <View style={styles.linksContainer}>
          <StyledText text="Don't have an account?" color="primaryDark"/>
          <TextLink href="/register" text="Sign Up!" color="primary" replace/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: GlobalTheme.spacing.lg,
    backgroundColor: GlobalTheme.colors.white,
    paddingVertical: GlobalTheme.spacing.lg,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    gap: GlobalTheme.spacing.xs,
  },
  divider: {
    width: "75%",
    height: 1,
    backgroundColor: GlobalTheme.colors.primary,
    marginVertical: GlobalTheme.spacing.sm,
  },
  linksContainer: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.xs,
  },
});