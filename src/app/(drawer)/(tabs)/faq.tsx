import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement FAQ layout, should just link to forums feature, giant foruma

export default function FAQ() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"FAQ"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
