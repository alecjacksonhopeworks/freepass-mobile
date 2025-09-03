import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";

// TODO: Implement Your Calander layout


export default function YourCalendar() {
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