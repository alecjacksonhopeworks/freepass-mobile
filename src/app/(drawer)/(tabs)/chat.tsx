import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Chat layout

export default function Chat() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"Chat"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
