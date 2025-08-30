import { StyleSheet, View } from "react-native";
import React from "react";
import LabeledTextInput from "../LabledTextInput";
import { GlobalTheme } from "@constants/global-themes";
import StyledButton from "../StyledButton";
import { useRouter } from "expo-router";

export default function ResetPasswordForm() {
  const router = useRouter();

  const handleReset = () => {
    // Here you’d trigger your password reset API
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <LabeledTextInput
        inputStyle={styles.input}
        label="Email"
        placeholder="Enter your account email..."
        placeholderTextColor={GlobalTheme.colors.primary}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <StyledButton
        buttonStyles={{ marginTop: GlobalTheme.spacing.lg }}
        text="Reset Password"
        width="100%"
        color="secondary"
        rounded={true}
        onPress={handleReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    gap: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.white,
  },
  input: {
    borderColor: GlobalTheme.colors.primary,
  },
});