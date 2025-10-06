import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import { Resource } from "@db/supabase/types";

export default function ResourceInfoCard({
  resource,
  logo_uri,
}: {
  resource: Resource;
  logo_uri: string | null;
}) {
  return (
    <View style={styles.card}>
      {logo_uri ? (
        <Image source={{ uri: logo_uri }} style={styles.logo} />
      ) : null}
      <StyledText
        text={resource.name}
        font="h4"
        weight="bold"
        style={styles.title}
      />
      {resource.description && (
        <StyledText
          text={resource.description}
          font="medium"
          style={styles.description}
        />
      )}
      {resource.hours && (
        <StyledText
          text={`Hours: ${resource.hours}`}
          font="small"
          style={styles.hours}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalTheme.colors.white,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.md,
    marginBottom: GlobalTheme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: "100%",
    height: 150,
    borderRadius: GlobalTheme.radius.sm,
    marginBottom: GlobalTheme.spacing.sm,
  },
  title: {
    marginBottom: GlobalTheme.spacing.sm,
  },
  description: {
    marginBottom: GlobalTheme.spacing.sm,
  },
  hours: {
    fontStyle: "italic",
  },
});
