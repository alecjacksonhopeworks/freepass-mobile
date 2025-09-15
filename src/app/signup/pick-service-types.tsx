import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ServiceTypeList from "@components/data/service_type/ServiceTypeList";
import { GlobalTheme } from "@constants/global-themes";
import StyledButton from "@components/StyledButton";
import { StyledText } from "@components/StyledText";
import {
  useServiceTypes,
  useSyncUserServiceTypes,
} from "@db/hooks/service_type";
import { useUpdateSignUpState } from "@db/hooks/auth";
import { useRouter } from "expo-router";

// Example static data; replace with dynamic Supabase fetch if needed

export default function PickServiceTypes() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const { data: serviceTypes, error: selectServiceTypesError } =
    useServiceTypes();

  const { mutate: mutateServiceTypes, error: addServiceTypeError } =
    useSyncUserServiceTypes();

  const { mutate: mutateSignUpState } = useUpdateSignUpState(() => router.replace('/signup/create-profile'));

  const handleNext = () => {
    if (selected.length < 2) {
      alert("Please select at least 2 categories");
      return;
    }
    // TODO: save selections via Supabase
    mutateServiceTypes(selected);
    mutateSignUpState("create_profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <StyledText
        text="What kind of resources are you interested in?"
        font="h1"
        color="black"
      />
      <StyledText
        text="(Pick at least 2)"
        font="medium"
        color="black"
      />
      </View>

      <ServiceTypeList
        serviceTypes={serviceTypes || []}
        selectedIds={selected}
        onSelectionChange={setSelected}
      />

      <StyledButton
        text="Next"
        onPress={handleNext}
        leftIcon="arrow-redo-outline"
        width="75%"
      />

      <StyledText
        text={selectServiceTypesError?.message || addServiceTypeError?.message}
        font="error"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: GlobalTheme.spacing.lg,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerContainer: {
    flexDirection: "column",
    gap: GlobalTheme.spacing.md
  },
});
