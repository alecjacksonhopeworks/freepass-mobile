import { View, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyledText } from "@components/StyledText";
import StyledButton from "@components/StyledButton";
import { ResourceCategory } from "./temp-types";

const categories: ResourceCategory[] = [
  "Housing","Food","Community","Jobs","Education","Finance","Medical",
  "MentalHealth","Legal","Transportation","Clothing","SubstanceUse",
  "Counseling","EmploymentTraining","Childcare","Technology",
  "ReentrySupport","Volunteer","Networking","Other"
];

export default function Step2() {
  const router = useRouter();
  const [selected, setSelected] = useState<ResourceCategory[]>([]);

  const toggleCategory = (cat: ResourceCategory) => {
    setSelected(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleNext = () => {
    if (selected.length < 2) return; // enforce minimum 2
    router.push("signup/create-profile");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StyledText text="What kind of resources are you interested in? (Pick at least 2)" font="large" />
      {categories.map(cat => (
        <StyledButton
          key={cat}
          text={cat}
          color={selected.includes(cat) ? "primary" : "secondaryLight"}
          onPress={() => toggleCategory(cat)}
        />
      ))}
      <StyledButton text="Next" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    gap: 12
  },
});
