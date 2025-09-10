import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ServiceTypeCard from "./ServiceTypeCard";
import { GlobalTheme } from "@constants/global-themes";
import { ServiceType } from "@db/supabase/types";


type ServiceTypeListzProps = {
  serviceTypes: ServiceType[];
  selectedIds?: number[]; // optional controlled selection
  onSelectionChange?: (selected: number[]) => void;
  minSelection?: number; // optional minimum selection
};

export default function ServiceTypeList({
  serviceTypes,
  selectedIds = [],
  onSelectionChange,
}: ServiceTypeListzProps) {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  const toggle = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        {serviceTypes.map((st) => (
          <ServiceTypeCard
            key={st.id}
            serviceType={st}
            selected={selected.includes(st.id)}
            onPress={() => toggle(st.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: GlobalTheme.spacing.md,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // space between columns
  },
});
