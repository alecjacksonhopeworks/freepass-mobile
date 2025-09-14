import React from "react";
import { DimensionValue, FlatList, StyleSheet, View } from "react-native";
import ResourceCard from "./ResourceCard";

// TODO: inspect and style generated ResourceList Component and later add  database resource type

type Resource = {
  id: string;
  name: string;
  description: string;
  image: any;
  favorite: boolean;
};

type ResourceListProps = {
  resources: Resource[];
  toggleFavorite: (id: string) => void;
  width?: DimensionValue;
};

export default function ResourceList({
  resources,
  toggleFavorite,
  width = "100%",
}: ResourceListProps) {
  return (
    <View style={[styles.list, { width }]}>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResourceCard resource={item} onToggleFavorite={toggleFavorite} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { height: "55%" },
});
