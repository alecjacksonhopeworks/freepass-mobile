import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import ResourceCard from "./ResourceCard";
import { FlatList } from 'react-native-gesture-handler'
import { ResourceSearchResult } from "@db/supabase/types";


// TODO: inspect and style generated ResourceList Component and later add  database resource type


type ResourceListProps = {
  data: ResourceSearchResult[];
  toggleFavorite: (id: number, isFavorited: boolean) => void;
  width?: DimensionValue;
};

export default function ResourceList({
  data,
  toggleFavorite,
  width = "100%",
}: ResourceListProps) {

  return (
    <View style={[styles.list, { width }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.resource_id.toString()}
        renderItem={({ item }) => (
          <ResourceCard data={item} toggleFavorite={toggleFavorite} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { height: "55%" },
});
