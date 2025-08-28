import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/global-themes";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";
import { StyledText } from "../../components/StyledText";
import { TextLink } from "../../components/TextLink";
import Spacer from "../../components/Spacer";

export default function ResetPassword() {

  return (
    <View style={styles.container}>
      <ResetPasswordForm />
      <View style={styles.footerContainer}>
        <StyledText text="Remembered your password?" color="primaryDark"/>
        <TextLink href="/login" text="Login" color="primaryDark" replace/>
      </View>
      <Spacer spacing='xxxl' />
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
  },
  footerContainer: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.xs,
  },
});
