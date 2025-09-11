import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import StyledButton from "@components/StyledButton";
import { useAuthStore } from "@db/store/useAuthStore";
import { GlobalTheme } from "@constants/global-themes";

export default function DebugStoreButton() {
  const session = useAuthStore((s) => s.session);
  const user = useAuthStore((s) => s.user);
  const privateUser = useAuthStore((s) => s.privateUser);
  const userSettings = useAuthStore((s) => s.userSettings);

  const handleLogStore = () => {
    console.log("Session:", session);
    console.log("User:", user);
    console.log("Private User:", privateUser);
    console.log("User Settings:", userSettings);
    alert("Check console for auth store values!");
  };

  return (
    <View style={styles.container}>
      <StyledButton
        text="Log Auth Store"
        onPress={handleLogStore}
        color="primary"
      />
      <ScrollView
        style={styles.debugBox}
        contentContainerStyle={{ padding: GlobalTheme.spacing.sm }}
      >
        <Text style={styles.debugText}>
          Session: {JSON.stringify(session, null, 2)}
        </Text>
        <Text style={styles.debugText}>
          User: {JSON.stringify(user, null, 2)}
        </Text>
        <Text style={styles.debugText}>
          Private User: {JSON.stringify(privateUser, null, 2)}
        </Text>
        <Text style={styles.debugText}>
          User Settings: {JSON.stringify(userSettings, null, 2)}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: GlobalTheme.spacing.md,
    marginVertical: GlobalTheme.spacing.md,
  },
  debugBox: {
    maxHeight: 300,
    backgroundColor: GlobalTheme.colors.secondaryLight,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    marginBottom: 4,
    color: GlobalTheme.colors.text,
  },
});
