import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Your Calander layout

export default function YourCalendar() {
  return (
    <View style={styles.container}>
      <SamplePage pageName={"Your Calendar"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
