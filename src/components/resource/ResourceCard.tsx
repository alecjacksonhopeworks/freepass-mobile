import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import IconToggle from "../IconToggle";
import { Resource } from "@constants/types";

// TODO: inspect and style generated ResourceCard Component and later add  database resource type



export type ResourceCardProps = {
  resource: Resource
  onToggleFavorite: (id: string) => void;
  favoriteLoading?: boolean;
};

export default function ResourceCard({
  resource,
  onToggleFavorite,
  favoriteLoading = false,
}: ResourceCardProps) {
  return (
    <View style={styles.card}>
      {resource.image ? (
        <Image source={{ uri: resource.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{resource.name}</Text>
        <Text style={styles.description}>{resource.description}</Text>
      </View>
      <IconToggle
        isOn={resource.favorite}
        onPress={() => onToggleFavorite(resource.id)}
        iconOn="heart"
        iconOff="heart-outline"
        size={28}
        loading={favoriteLoading}
      />
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
    marginBottom: GlobalTheme.spacing.md,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: GlobalTheme.radius.sm,
    marginRight: GlobalTheme.spacing.md,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: GlobalTheme.radius.sm,
    marginRight: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.gray,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: GlobalTheme.colors.text,
  },
});