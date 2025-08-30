import { StyleSheet, View } from 'react-native'
import React from 'react'
import LabeledTextInput from '../LabledTextInput'
import { GlobalTheme } from "@constants/global-themes"
import { useRouter } from 'expo-router';
import StyledButton from '../StyledButton';

export default function LoginForm() {
  const router = useRouter();
  
  const handleLogin = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
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
        buttonStyles={{marginTop: GlobalTheme.spacing.lg}}
        text="Login"
        width="100%"
        color="secondary"
        rounded={true}
        onPress={handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "75%",
    gap: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.white,
  },
  input: {
    borderColor: GlobalTheme.colors.primary,
  }
})