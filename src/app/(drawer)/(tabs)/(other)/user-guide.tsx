import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement User Guide layout


export default function UserGuide() {
  const name = arguments.callee.name
  return (
    <View style={styles.container}>
      <SamplePage pageName={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});