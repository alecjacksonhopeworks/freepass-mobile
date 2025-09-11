import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement User Guide layout

export default function UserGuide() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"UserGuide"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
