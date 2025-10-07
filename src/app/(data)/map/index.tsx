import { WebView } from "react-native-webview";
import { useResourceMapTiles } from "@db/supabase/hooks/useResourceMapTiles";
import { View, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useResourceMapDetails } from "@db/hooks/resource";
import { Asset } from "expo-asset";


export default function UserResourceMapLibre() {
  const { data: mapTilesUrl, isLoading } = useResourceMapTiles();

  const params = useLocalSearchParams();
  const resourceIds: number[] = JSON.parse(params.ids as string);

  console.log("Resource IDs for map:", resourceIds);

  const {data: mapDetails } = useResourceMapDetails(resourceIds);

  const htmlFile = Asset.fromModule(require("../../assets/html/map.html")).uri;


  if (isLoading || !htmlFile) return <View style={styles.container} />;

  const injectedJS = `
    window.MAP_TILES_URL = "${mapTilesUrl}";
    window.RESOURCE_MAP_DETAILS = ${JSON.stringify(mapDetails)};
    true;
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ uri: htmlFile }}
      injectedJavaScript={injectedJS}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
