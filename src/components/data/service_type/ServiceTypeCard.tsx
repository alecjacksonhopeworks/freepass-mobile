import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes";
import { ServiceType } from "@db/supabase/types";

type ServiceTypeCardProps = {
  serviceType: ServiceType;
  selected: boolean;
  onPress: () => void;
};

export default function ServiceTypeCard({
  serviceType,
  selected,
  onPress,
}: ServiceTypeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        selected && {
          borderColor: GlobalTheme.colors.primary,
          backgroundColor: GlobalTheme.colors.primaryLight,
        },
      ]}
    >
      <View style={styles.row}>
        <Ionicons
          name={serviceType.icon}
          size={20}
          color={
            selected ? GlobalTheme.colors.primary : GlobalTheme.colors.gray
          }
        />
        <Text
          style={[
            styles.name,
            selected && { color: GlobalTheme.colors.primary },
          ]}
        >
          {serviceType.name}
        </Text>
      </View>
      <Text style={styles.description}>{serviceType.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: GlobalTheme.spacing.md,
    borderRadius: GlobalTheme.spacing.lg,
    borderWidth: 1,
    borderColor: GlobalTheme.colors.primary,
    backgroundColor: GlobalTheme.colors.white,
    marginBottom: GlobalTheme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: GlobalTheme.spacing.xs,
  },
  name: {
    marginLeft: GlobalTheme.spacing.sm,
    ...GlobalTheme.typography.medium,
  },
  description: {
    ...GlobalTheme.typography.small,
    color: GlobalTheme.colors.gray,
  },
});
