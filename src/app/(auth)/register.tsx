import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/global-themes";
import RegisterForm from "../../components/forms/RegisterForm";
import { StyledText } from "../../components/StyledText";
import { TextLink } from "../../components/TextLink";

export default function Signup() {
  return (
    <View style={styles.container}>
      <RegisterForm />
      <View style={styles.footerContainer}>
        <StyledText text="Already have an account?" color="primaryDark" />
        <TextLink href="/login" text="Login" color="primaryDark"/>
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