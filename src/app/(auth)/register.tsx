import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import RegisterForm from "@components/forms/RegisterForm";
import { StyledText } from "@components/StyledText";
import { TextLink } from "@components/TextLink";
import AuthHeader from "@components/AuthHeader";

export default function Signup() {
  return (
    <AuthHeader title="Create Account" subtitle="Sign up to get started">
      <View style={styles.container}>
        <RegisterForm />
        <View style={styles.footerContainer}>
          <StyledText text="Already have an account?" color="primaryDark" />
          <TextLink href="/login" text="Login" color="primaryDark"/>
        </View>
      </View>
    </AuthHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: GlobalTheme.spacing.lg,
    backgroundColor: GlobalTheme.colors.white,
    paddingVertical: GlobalTheme.spacing.lg,
  },
  footerContainer: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.xs 
  },
});