import { ServiceTypeDropdown } from "@components/dropdowns/ServiceTypeDropdown";
import IconToggle from "@components/IconToggle";
import SearchBar from "@components/SearchBar";
import StyledButton from "@components/StyledButton";
import { GlobalTheme } from "@constants/global-themes";
import { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ResourceList from "./ResourceList";
import { Keyboard } from "react-native";

type Resource = {
  id: string;
  name: string;
  description: string;
  image: any;
  favorite: boolean;
};

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

function ResourceFilteredSearch() {
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);

  const filteredResources = resources
    .filter((r) => (showFavorites ? r.favorite : true))
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = (id: string) => {
    setTimeout(() => {
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
      );
    }, 500);
  };

  const loadResourceMapView = () => {
    console.log("load resource map view");
    //TODO: Load filtered Resources into map view search
  };
  return (
    <View style={styles.filterContainer}>
      <StyledButton
        text="Find Resources Near Me Now"
        onPress={loadResourceMapView}
        color="secondary"
        leftIcon="navigate"
      />
      <SearchBar
        placeholder="Search resources..."
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
        }}
        showIcon
        width="95%"
      />

      <View style={styles.toggleContainer}>
        <IconToggle
          isOn={showFavorites}
          onPress={() => setShowFavorites(!showFavorites)}
          iconOn="heart"
          iconOff="heart-outline"
          size={28}
          style={{ marginTop: GlobalTheme.spacing.sm }}
        />

        <ServiceTypeDropdown
          onChange={(st) => setServiceType(st)}
          value={serviceType}
          width="80%"
        />
      </View>

      <ResourceList
        resources={filteredResources}
        toggleFavorite={toggleFavorite}
      />
    </View>
  );
}

export default ResourceFilteredSearch;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: GlobalTheme.spacing.md,
    width: "95%",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: -14,
  },
});
