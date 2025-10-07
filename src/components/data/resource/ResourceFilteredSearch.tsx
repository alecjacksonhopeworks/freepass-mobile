import { ServiceTypeDropdown } from "@components/dropdowns/ServiceTypeDropdown";
import IconToggle from "@components/IconToggle";
import SearchBar from "@components/SearchBar";
import StyledButton from "@components/StyledButton";
import { GlobalTheme } from "@constants/global-themes";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import ResourceList from "./ResourceList";
import {
  useFavoriteResource,
  useSearchResources,
  useUnfavoriteResource,
} from "@db/hooks/resource";
import { ResourceSearchParams } from "@db/supabase/types";
import { useAuthStore } from "@db/store/useAuthStore";
import { router } from "expo-router";

function ResourceFilteredSearch() {
  console.log("rerender component", "ResourceFilterSearch");
  const session = useAuthStore((store) => store.session);
  const [searchParams, setSearchParams] = useState<ResourceSearchParams>({
    search_text: "",
    input_service_type_id: undefined,
    input_user_id: session?.user.id,
    only_favorites: false,
  });

  const { data: searchResults, error } = useSearchResources(searchParams);

  const { mutate: callFavoriteResource } = useFavoriteResource();
  const { mutate: callUnfavoriteResource } = useUnfavoriteResource();

  const setSearch = (text: string) => {
    setSearchParams((prev) => ({ ...prev, search_text: text }));
  };

  const setShowFavorites = (value: boolean) => {
    setSearchParams((prev) => ({ ...prev, only_favorites: value }));
  };

  const setServiceType = (service_type_id: number | undefined) => {
    setSearchParams((prev) => ({
      ...prev,
      input_service_type_id: service_type_id,
    }));
  };

  const toggleFavorite = (id: number, isFavorited: boolean) => {
    setTimeout(() => {
      isFavorited ? callUnfavoriteResource(id) : callFavoriteResource(id);
    }, 500);
  };

  const loadResourceMapView = () => {
    let resourceIds: number[] = searchResults?.map((r) => r.resource_id) || [];
    if (resourceIds.length > 0) {
      router.push({
        pathname: '/map',
        params: { data: JSON.stringify(resourceIds) },
      });
    }
    else{
      console.error("No resources to show on map");
    }
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
        searchText={searchParams.search_text || ""}
        onSearch={setSearch}
        showIcon
        width="95%"
      />

      <View style={styles.toggleContainer}>
        <IconToggle
          isOn={searchParams.only_favorites}
          onPress={() => setShowFavorites(!searchParams.only_favorites)}
          iconOn="heart"
          iconOff="heart-outline"
          size={28}
          style={{ marginTop: GlobalTheme.spacing.sm }}
        />

        <ServiceTypeDropdown
          onChange={(stId) => setServiceType(Number(stId))}
          value={searchParams.input_service_type_id}
          width="80%"
        />
      </View>

      <ResourceList
        data={searchResults || []}
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
