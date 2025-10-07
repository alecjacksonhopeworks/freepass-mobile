import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
import { useResourceMapTiles } from "@db/supabase/hooks/useResourceMapTiles";
import { useResourceMapDetails } from "@db/hooks/resource";
import { useLocalSearchParams } from "expo-router";

export default function UserResourceMapLibre() {
  const params = useLocalSearchParams();
  const resourceIds: number[] = JSON.parse(params.data as string);

  const { data: mapTilesUrl, isLoading: isTilesLoading } =
    useResourceMapTiles();
  const { data: mapDetails, isLoading: isDetailsLoading } =
    useResourceMapDetails(resourceIds);

  const [htmlUri, setHtmlUri] = useState<string | null>(null);

  useEffect(() => {
    async function loadHtml() {
      const asset = Asset.fromModule(
        require("../../../../assets/html/map.html")
      );
      await asset.downloadAsync();
      setHtmlUri(asset.uri);
    }
    loadHtml();
  }, []);

  if (isTilesLoading || isDetailsLoading || !htmlUri) {
    return <View style={styles.container} />;
  }

  const injectedJS = `
    window.MAP_TILES_URL = "${mapTilesUrl}";
    window.RESOURCES = ${JSON.stringify(mapDetails || [])};
    true;
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: htmlUri }}
      injectedJavaScript={injectedJS}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",//Dimensions.get("window").width,
    height: "95%",//Dimensions.get("window").height,
    borderWidth: 3
  },
});
