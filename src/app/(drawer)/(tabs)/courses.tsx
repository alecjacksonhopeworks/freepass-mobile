import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Coruses layout

export default function Courses() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"COurses"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
