import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import StyledButton from "@components/StyledButton";
import { StyledText } from "@components/StyledText";

//TODO: Revamp generated layout and implement signup step logic

export default function ChooseRole() {
  const router = useRouter();

  const handleChoice = (choice: "Finder" | "Provider") => {
    router.replace("/signup/pick-categories");
  };

  return (
    <View style={styles.container}>
      <StyledText text="Are you joining to find or provide resources?" font="large" />
      <StyledButton text="Find Resources" onPress={() => handleChoice("Finder")} />
      <StyledButton text="Provide Resources" onPress={() => handleChoice("Provider")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
});
