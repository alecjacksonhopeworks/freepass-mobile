// SamplePage.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SamplePageProps = {
  pageName: string;
};

export default function SamplePage({ pageName }: SamplePageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{pageName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
});
