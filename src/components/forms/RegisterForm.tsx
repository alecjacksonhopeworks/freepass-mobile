import { StyleSheet, View } from "react-native";
import React from "react";
import { GlobalTheme } from "@constants/global-themes";
import StyledButton from "../StyledButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledText } from "../StyledText";
import { useSignUp } from "@db/hooks/auth";
import { TextFormInput } from "./form-inputs";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email")
    .email("The email you entered is not valid"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters"),
  fullname: yup
    .string()
    .trim()
    .required("Full name is required.")
    .min(2, "Full name must be at least 2 characters")
    .max(30, "Full name cannot exceed 100 characters"),
});

type SignUpFormData = {
  fullname: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { mutate, error } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <TextFormInput
        label="Full Name"
        name="fullname"
        control={control}
        errorText={errors.fullname?.message}
        placeholder="Enter your full name..."
        placeholderTextColor={GlobalTheme.colors.primary}
      />

      <TextFormInput
        label="Email"
        name="email"
        control={control}
        errorText={errors.email?.message}
        placeholder="Enter email..."
        placeholderTextColor={GlobalTheme.colors.primary}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextFormInput
        label="Password"
        name="password"
        control={control}
        errorText={errors.password?.message}
        placeholder="Enter password..."
        placeholderTextColor={GlobalTheme.colors.primary}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.formItemContainer}>
        <StyledButton
          buttonStyles={{ marginTop: GlobalTheme.spacing.sm }}
          text="Sign Up"
          color="secondary"
          width="100%"
          rounded={true}
          onPress={handleSubmit(onSubmit)}
        />
        <StyledText text={error?.message} font="error" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    gap: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.white,
  },
  input: {
    borderColor: GlobalTheme.colors.primary,
  },
  formItemContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: GlobalTheme.spacing.xs,
    width: "100%",
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderWidth: 2,
    gap: GlobalTheme.spacing.md,
  },
});
