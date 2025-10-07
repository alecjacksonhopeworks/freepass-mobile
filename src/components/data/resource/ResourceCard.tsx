import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import IconToggle from "@components/IconToggle";
import { ResourceSearchResult } from "@db/supabase/types";
import { TextLink } from "@components/TextLink";

// TODO: inspect and style generated ResourceCard Component and later add  database resource type

export type ResourceCardProps = {
  data: ResourceSearchResult;
  toggleFavorite: (id: number, isFavorited: boolean) => void;
};

export default function ResourceCard({
  data,
  toggleFavorite,
}: ResourceCardProps) {
  const [isFavorited, setIsFavorited] = useState<boolean>(data.is_favorited);

  const onToggleFavorite = () => {
    console.log('ResourceCard toggling favorite for resource:', data.resource_name, 'Currently favorited:', isFavorited);
    setIsFavorited((prev) => !prev);
    toggleFavorite(data.resource_id, isFavorited);
  };
  return (
    <View style={styles.card}>
      {data.org_logo_uri ? (
        <Image source={{ uri: data.org_logo_uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <TextLink
            href={`/resource/${data.resource_id}`}
            push={true}
            text={data.resource_name}
            font="large"
            weight="bold"
            style={styles.name}
            numberOfLines={2}
            ellipsizeMode="tail"
            noUnderline
          />
          <IconToggle
            isOn={isFavorited}
            onPress={onToggleFavorite}
            iconOn="heart"
            iconOff="heart-outline"
            size={28}
          />
        </View>
        <StyledText
          text={data.resource_description || ""}
          font="medium"
          style={styles.description}
          numberOfLines={2}
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
    padding: GlobalTheme.spacing.sm,
    gap: GlobalTheme.spacing.sm,
    borderWidth: 1,
    borderColor: GlobalTheme.colors.gray,
    borderRadius: GlobalTheme.radius.md,
    marginBottom: GlobalTheme.spacing.md,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: GlobalTheme.radius.sm,
  },
  placeholderImage: {
    width: 75,
    height: 75,
    borderRadius: GlobalTheme.radius.sm,
    backgroundColor: GlobalTheme.colors.gray,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: GlobalTheme.spacing.xs,
    width: "100%",
    paddingRight: GlobalTheme.spacing.sm,
  },
  name: {
    ...GlobalTheme.typography.large,
    marginBottom: GlobalTheme.spacing.xs,
    width: "90%",
    textAlign: "left",
  },
  description: {
    ...GlobalTheme.typography.medium,
    textAlign: "left",
    width: "95%",
  },
});
