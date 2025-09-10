import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledText } from "@components/StyledText";
import StyledButton from "@components/StyledButton";
import { TextFormInput } from "./form-inputs";
import { GlobalTheme } from "@constants/global-themes";
import Checkbox from "expo-checkbox";

type AddressFormData = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  show_address: boolean;
};

const schema = yup.object().shape({
  address1: yup.string().required("Address Line 1 is required").trim(),
  address2: yup.string().trim().default(""), 
  city: yup.string().required("City is required").trim(),
  state: yup.string().required("State is required").trim(),
  zip: yup.string().required("ZIP code is required").trim(),
  show_address: yup.boolean().required(),
});

type AddressFormProps = {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
};

export default function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      show_address: false,
      ...defaultValues,
    },
  });

  return (
    <View style={styles.container}>
      <TextFormInput
        label="Address Line 1 *"
        name="address1"
        control={control}
        errorText={errors.address1?.message}
        placeholder="Enter address line 1..."
      />
      <TextFormInput
        label="Address Line 2"
        name="address2"
        control={control}
        errorText={errors.address2?.message}
        placeholder="Enter address line 2..."
      />
      <TextFormInput
        label="City *"
        name="city"
        control={control}
        errorText={errors.city?.message}
        placeholder="Enter city..."
      />
      <TextFormInput
        label="State *"
        name="state"
        control={control}
        errorText={errors.state?.message}
        placeholder="Enter state..."
      />
      <TextFormInput
        label="ZIP Code *"
        name="zip"
        control={control}
        errorText={errors.zip?.message}
        placeholder="Enter ZIP code..."
        keyboardType="number-pad"
      />

      <Controller
        control={control}
        name="show_address"
        render={({ field: { value, onChange } }) => (
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={value}
              onValueChange={onChange}
              color={value ? GlobalTheme.colors.primary : undefined}
            />
            <StyledText text="Show this address on profile"/>
          </View>
        )}
      />

      <View style={{ width: "100%", marginTop: GlobalTheme.spacing.md }}>
        <StyledButton text="Save Address" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "75%",
    gap: GlobalTheme.spacing.sm,
    backgroundColor: GlobalTheme.colors.white,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalTheme.spacing.sm,
    marginTop: GlobalTheme.spacing.md,
  },
});
