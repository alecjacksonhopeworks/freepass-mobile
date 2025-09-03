import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Profile layout


export default function Profile() {
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