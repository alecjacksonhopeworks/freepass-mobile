import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LabeledTextInput from '../text-inputs'
import { GlobalTheme } from '../../constants/global-themes'
import { useRouter } from 'expo-router';

export default function LoginForm() {
  const router = useRouter();
  
  const handleLogin = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.white,
  },
  button: {
    backgroundColor: GlobalTheme.colors.secondary,
    ...GlobalTheme.typography.medium,
    paddingVertical: 11,
    borderRadius: GlobalTheme.radius.lg,
    alignItems: "center",
    marginTop: GlobalTheme.spacing.sm,
    width: "75%"
  },
  buttonText: {
    color: GlobalTheme.colors.white,
    ...GlobalTheme.typography.medium, 
  },
})