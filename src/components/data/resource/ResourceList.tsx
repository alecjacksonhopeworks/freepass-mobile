import React from "react";
import { FlatList } from "react-native";
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
};

export default function ResourceList({
  resources,
  toggleFavorite,
}: ResourceListProps) {
  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ResourceCard resource={item} onToggleFavorite={toggleFavorite} />
      )}
    />
  );
}
