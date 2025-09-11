import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Events layout
// TODO: calendar intergration

export default function Events() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"Events"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
