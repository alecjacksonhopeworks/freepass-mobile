import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MapView,
  Camera,
  PointAnnotation,
  RasterSource,
  RasterLayer,
  Callout,
} from "@maplibre/maplibre-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResourceMapTiles } from "@db/supabase/hooks/useResourceMapTiles";
import { useResourceMapDetails } from "@db/hooks/resource";
import { useLocalSearchParams } from "expo-router";


export default function UserResourceMap() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const resourceIds: number[] = JSON.parse(params.data as string);

  const { data: mapTilesUrl, isLoading: isTilesLoading } =
    useResourceMapTiles();
  const { data: mapDetails, isLoading: isDetailsLoading } =
    useResourceMapDetails(resourceIds);

  if (isTilesLoading || isDetailsLoading || !mapTilesUrl) {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <MapView style={styles.map} logoEnabled={false}>
        <Camera
          zoomLevel={10}
          centerCoordinate={
            mapDetails?.length
              ? [
                  mapDetails[0].address.longitude!,
                  mapDetails[0].address.latitude!,
                ]
              : [-75.16, 39.95]
          }
        />

        {/* Raster source from PMTiles URL */}
        <RasterSource
          id="pmtiles"
          tileUrlTemplates={[mapTilesUrl]}
          tileSize={256}
        >
          <RasterLayer
            id="pmtiles-layer"
            sourceID="pmtiles"
            style={{ rasterOpacity: 1 }}
          />
        </RasterSource>

        {/* Resource markers */}
        {mapDetails?.map((r) => (
          <PointAnnotation
            key={r.resource.id}
            id={`${r.resource.id}`}
            coordinate={[r.address.longitude!, r.address.latitude!]}
          >
            <View style={styles.marker} />
            <Callout title={r.resource.name} />
          </PointAnnotation>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
