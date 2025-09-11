import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes";
import { ServiceType } from "@db/supabase/types";
import { Ionicon } from "@constants/types";
import { StyledText } from "@components/StyledText";

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
       <Ionicons
          name={serviceType.icon as Ionicon}
          size={40}
          color={
            selected ? GlobalTheme.colors.primary : GlobalTheme.colors.gray
          }
        />
        <StyledText
          text={serviceType.name}
          color={selected ? "primary" : "black"}
          font="medium"
          style={{fontWeight: "bold"}}
          numberOfLines={2} 
          ellipsizeMode="tail"
        />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: GlobalTheme.spacing.md,
    borderRadius: GlobalTheme.spacing.lg,
    borderWidth: 1.2,
    borderColor: GlobalTheme.colors.primary,
    backgroundColor: GlobalTheme.colors.white,
    marginBottom: GlobalTheme.spacing.sm,
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
  },
});
