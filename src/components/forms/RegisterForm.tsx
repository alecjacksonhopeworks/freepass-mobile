import { StyleSheet, View } from "react-native";
import React from "react";
import LabeledTextInput from "../LabledTextInput";
import { GlobalTheme } from "../../constants/global-themes";
import StyledButton from "../StyledButton";
import { useRouter } from "expo-router";

export default function RegisterForm() {
  const router = useRouter();

  const handleSignup = () => {
    router.replace("/home"); // Redirect after signup
  };

  return (
    <View style={styles.container}>
      <LabeledTextInput
        inputStyle={styles.input}
        label="Name"
        placeholder="Enter your name..."
        placeholderTextColor={GlobalTheme.colors.primary}
      />

      <LabeledTextInput
        inputStyle={styles.input}
        label="Email"
        placeholder="Enter email..."
        placeholderTextColor={GlobalTheme.colors.primary}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <LabeledTextInput
        inputStyle={styles.input}
        label="Password"
        placeholder="Enter password..."
        placeholderTextColor={GlobalTheme.colors.primary}
        secureTextEntry
      />

      <StyledButton
        buttonStyles={{ marginTop: GlobalTheme.spacing.lg }}
        text="Sign Up"
        color="secondary"
        width="100%"
        rounded={true}
        onPress={handleSignup}
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