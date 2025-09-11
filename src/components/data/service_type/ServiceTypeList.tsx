import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ServiceTypeCard from "./ServiceTypeCard";
import { GlobalTheme } from "@constants/global-themes";
import { ServiceType } from "@db/supabase/types";

type ServiceTypeListProps = {
  serviceTypes: ServiceType[];
  selectedIds?: number[];
  onSelectionChange?: (selected: number[]) => void;
};

export default function ServiceTypeList({
  serviceTypes,
  selectedIds = [],
  onSelectionChange,
}: ServiceTypeListProps) {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  const toggle = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const renderItem = ({ item }: { item: ServiceType }) => (
    <ServiceTypeCard
      serviceType={item}
      selected={selected.includes(item.id)}
      onPress={() => toggle(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
      data={serviceTypes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // grid with 2 columns
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row} // spacing between columns
      showsVerticalScrollIndicator={false}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%"
  },
  listContainer: {
    padding: GlobalTheme.spacing.md,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: GlobalTheme.spacing.md,
  },
});
