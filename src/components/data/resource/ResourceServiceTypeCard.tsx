import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import { ServiceType } from "@db/supabase/types";
import StyledButton from "@components/StyledButton";
import { Ionicon } from "@constants/types";

export default function ResourceServiceTypeCard({
  serviceTypes,
}: {
  serviceTypes: ServiceType[];
}) {
  return (
    <View style={styles.card}>
      {serviceTypes.map((st) => (
        <StyledButton
          key={st.id}
          text={st.name}
          leftIcon={st.icon as Ionicon}
          color="primaryDark"
          textColor="white"
          rounded
          buttonStyles={styles.button}
          font="small"
          iconSize={20}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: GlobalTheme.spacing.md,
    borderRadius: GlobalTheme.radius.md,
    backgroundColor: GlobalTheme.colors.gray,
    gap: GlobalTheme.spacing.sm, 
  },
  button: {
    paddingVertical: GlobalTheme.spacing.xs,
    paddingHorizontal: GlobalTheme.spacing.md,
  },
});
