import { View, StyleSheet } from "react-native";
import SamplePage from "@components/SamplePage";


// TODO: Implement Coruses layout


export default function Courses() {
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