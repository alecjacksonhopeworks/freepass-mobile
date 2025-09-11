import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Settings layout

export default function Settings() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"Settings"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
