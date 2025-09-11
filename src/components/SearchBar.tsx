import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes";

// TODO: inspect generated search bar component, style (with icon) add reasonable design, (onChange or onEnter)

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  showIcon?: boolean;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
  showIcon = false,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {showIcon && (
        <FontAwesome
          name="search"
          size={20}
          color={GlobalTheme.colors.gray}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, showIcon && { paddingLeft: 36 }]}
        placeholder={placeholder}
        placeholderTextColor={GlobalTheme.colors.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative" },
  icon: { position: "absolute", left: 10, top: "50%", marginTop: -10 },
  input: {
    borderWidth: 1,
    borderColor: GlobalTheme.colors.primary,
    borderRadius: GlobalTheme.radius.sm,
    padding: GlobalTheme.spacing.sm,
  },
});
