import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/global-themes";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import { StyledText } from "../../components/StyledText";
import { TextLink } from "../../components/TextLink";

export default function ResetPassword() {

  return (
    <View style={styles.container}>
      <ResetPasswordForm />
      <View style={styles.footerContainer}>
        <StyledText text="Remembered your password?" color="primaryDark"/>
        <TextLink href="/login" text="Login" color="primaryDark" replace/>
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
    flexDirection: "row",
    gap: GlobalTheme.spacing.xs,
    marginTop: GlobalTheme.spacing.md,
  },
});
