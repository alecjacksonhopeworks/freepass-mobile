import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import { Organization } from "@db/supabase/types";

export default function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <View style={styles.card}>
      {organization.logo_uri ? (
        <Image source={{ uri: organization.logo_uri }} style={styles.logo} />
      ) : (
        <View style={styles.placeholderLogo} />
      )}
      <View style={styles.info}>
        <StyledText
          text={organization.name}
          font="h4"
          weight="bold"
          style={styles.name}
        />

        <StyledText
          text={organization.description || ''}
          font="medium"
          style={styles.description}
          numberOfLines={4}
         ellipsizeMode="tail"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: GlobalTheme.spacing.md,
    borderWidth: 1,
    borderColor: GlobalTheme.colors.gray,
    borderRadius: GlobalTheme.radius.md,
    backgroundColor: GlobalTheme.colors.white,
    marginBottom: GlobalTheme.spacing.md,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: GlobalTheme.radius.sm,
    marginRight: GlobalTheme.spacing.md,
  },
  placeholderLogo: {
    width: 60,
    height: 60,
    borderRadius: GlobalTheme.radius.sm,
    marginRight: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.gray,
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: GlobalTheme.spacing.xs,
  },
  orgName: {
    marginBottom: GlobalTheme.spacing.xs,
    color: GlobalTheme.colors.primary,
  },
  description: {
    color: GlobalTheme.colors.text,
  },
});
