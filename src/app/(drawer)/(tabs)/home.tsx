import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FreepassLogoImage } from "@components/Images";
import StyledButton from "@components/StyledButton";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import SearchBar from "@components/SearchBar";
import ResourceCard from "@components/data/resource/ResourceCard";
import { Resource } from "@constants/types";
import DebugStoreButton from "@components/debug/DebugStoreButton";

const defaultResources: Resource[] = [
  {
    id: "1",
    name: "Local Food Bank",
    description: "Provides meals and groceries for those in need.",
    image: null,
    favorite: false,
  },
  {
    id: "2",
    name: "Job Training Center",
    description: "Career development and skills training programs.",
    image: null,
    favorite: true,
  },
  {
    id: "3",
    name: "Community Shelter",
    description: "Temporary housing and support services.",
    image: null,
    favorite: false,
  },
];

export default function Home() {
  const [resources, setResources] = useState(defaultResources);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [savingFavoriteId, setSavingFavoriteId] = useState<string | null>(null);

  const filteredResources = resources
    .filter((r) => (showFavorites ? r.favorite : true))
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = (id: string) => {
    setSavingFavoriteId(id);
    setTimeout(() => {
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)),
      );
      setSavingFavoriteId(null);
    }, 500); // simulate async save delay
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FreepassLogoImage />
        <StyledButton
          text="Quick List"
          color="secondary"
          rounded
          onPress={() => {}}
        />
      </View>

      {/* Instruction */}
      <StyledText
        text="To find relevant services in your area, you may use the Search bar, choose Search by Category, or view Resources near you."
        font="small"
        color="text"
        style={{ marginBottom: GlobalTheme.spacing.md }}
      />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search resources..."
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        showIcon
      />

      {/* Favorites Toggle */}
      <View style={styles.toggleContainer}>
        <StyledButton
          text="All"
          width="48%"
          color={!showFavorites ? "primary" : "gray"}
          onPress={() => setShowFavorites(false)}
        />
        <StyledButton
          text="Favorites"
          width="48%"
          color={showFavorites ? "primary" : "gray"}
          onPress={() => setShowFavorites(true)}
        />
      </View>

      {/* Resources List */}
      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResourceCard
            resource={item}
            onToggleFavorite={toggleFavorite}
            favoriteLoading={savingFavoriteId === item.id}
          />
        )}
        contentContainerStyle={{ paddingBottom: GlobalTheme.spacing.lg }}
      />

      {/* Find Resources Button */}
      <StyledButton
        text="Find Resources Near Me Now"
        color="secondary"
        rounded
        style={{ marginTop: GlobalTheme.spacing.md }}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.background,
    gap: GlobalTheme.spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.md,
    justifyContent: "center",
  },
});
