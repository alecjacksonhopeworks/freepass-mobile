import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller, Control } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { GlobalTheme } from "@constants/global-themes";

type Props = {
  label: string;
  tooltip: string;
  name: string;
  control: Control<any>;
};

export default function CheckboxWithTooltip({
  label,
  tooltip,
  name,
  control,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Checkbox value={value} onValueChange={onChange} />
          <Text style={styles.label}>
            {label} ({tooltip})
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: GlobalTheme.colors.primary,
  },
});
