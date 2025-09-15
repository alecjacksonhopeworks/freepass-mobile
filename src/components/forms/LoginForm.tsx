import { StyleSheet, View } from "react-native";
import React from "react";
import { GlobalTheme } from "@constants/global-themes";
import StyledButton from "@components/StyledButton";
import { useSignIn } from "@db/hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StyledText } from "@components/StyledText";
import { TextFormInput } from "./form-inputs";
import { useRouter } from "expo-router";


//TODO: Test Login On Network failure, should produce error

type LoginFormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter an email")
    .email("The email you entered is not valid email."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(7, "Password longer than y chars"),
});

export default function LoginForm() {
  const router = useRouter()
  const { mutate: mutateSignIn, isPending, error } = useSignIn(() => router.replace('/home'));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutateSignIn(data);
  };

  return (
    <View style={styles.container}>
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

      {/* Submit */}
      <View style={[styles.formItemContainer, { alignItems: "center" }]}>
        <StyledButton
          buttonStyles={{ marginTop: GlobalTheme.spacing.lg }}
          text="Login"
          width="100%"
          color="secondary"
          rounded={true}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
        <StyledText text={error?.message} font="error" />
      </View>

      <StyledButton
        text="Autofill Test Account"
        color="primaryDark"
        leftIcon="alert-outline"
        onPress={() => {
          setValue("email", "test@gmail.com");
          setValue("password", "password");
        }}
      />
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
});
