import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GlobalTheme } from "@constants/global-themes";
import StyledButton from "@components/StyledButton";
import { TextFormInput } from "./form-inputs";
import CheckboxWithTooltip from "@components/CheckboxWithTooltip";
import ProfileImagePicker from "@components/data/user/ProfileImagePicker";
import { useAuthStore } from "@db/store/useAuthStore";

type UserProfileFormData = {
  profile_pic_url: string;
  email: string;
  username: string;
  phone_number: string;
  full_name: string;
  address: string;
  about_description: string;
  show_email: boolean;
  show_phone_number: boolean;
  show_full_name: boolean;
  show_address: boolean;
};

const schema = yup.object().shape({
  profile_pic_url: yup.string().trim().default(""),
  email: yup
    .string()
    .email("Invalid email.")
    .required("Email required.")
    .trim(),
  username: yup.string().required("Username is required").trim(),
  phone_number: yup.string().trim().default(""),
  full_name: yup.string().trim().default(""),
  address: yup.string().trim().default(""),
  about_description: yup.string().required("Please add a description.").trim(),
  show_email: yup.boolean().required(),
  show_phone_number: yup.boolean().required(),
  show_full_name: yup.boolean().required(),
  show_address: yup.boolean().required(),
});

export default function UserProfileForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      show_email: false,
      show_phone_number: false,
      show_full_name: false,
      show_address: false,
    },
  });

  const onSubmit = (data: UserProfileFormData) => {
    console.log("Submitted user profile data:", data);
    // call mutation to save user data
  };

  const privateUser = useAuthStore((store) => store.privateUser);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Pic */}
      <ProfileImagePicker
        onImageSelected={(url) => setValue("profile_pic_url", url)}
      />

      {/* Username */}
      <TextFormInput
        label="Username"
        name="username"
        control={control}
        errorText={errors.username?.message}
        placeholder="Enter username..."
      />

      {/* Email */}
      <TextFormInput
        label="Email"
        name="email"
        control={control}
        errorText={errors.email?.message}
        placeholder="Enter email..."
        keyboardType="email-address"
        autoCapitalize="none"
        value={privateUser?.email}
        editable={false}
      />
      <CheckboxWithTooltip
        label="Show Email on Profile"
        tooltip="This email will be visible on your public profile"
        control={control}
        name="show_email"
      />

      {/* Full Name */}
      <TextFormInput
        label="Full Name"
        name="full_name"
        control={control}
        placeholder="Enter full name..."
      />
      <CheckboxWithTooltip
        label="Show Full Name"
        tooltip="This will be visible on your public profile"
        control={control}
        name="show_full_name"
      />

      {/* Phone Number */}
      <TextFormInput
        label="Phone Number"
        name="phone_number"
        control={control}
        placeholder="Enter phone number..."
        keyboardType="phone-pad"
      />
      <CheckboxWithTooltip
        label="Show Phone Number"
        tooltip="This will be visible on your public profile"
        control={control}
        name="show_phone_number"
      />

      {/* Address */}
      <TextFormInput
        label="Address"
        name="address"
        control={control}
        placeholder="Enter address..."
      />
      <CheckboxWithTooltip
        label="Show Address"
        tooltip="This will be visible on your public profile"
        control={control}
        name="show_address"
      />

      {/* About Description */}
      <TextFormInput
        label="Description"
        name="about_description"
        control={control}
        errorText={errors.about_description?.message}
        placeholder="Tell us about yourself..."
        multiline
        numberOfLines={4}
      />

      {/* Submit */}
      <StyledButton
        buttonStyles={{ marginTop: GlobalTheme.spacing.lg }}
        text="Save Profile"
        width="100%"
        color="secondary"
        rounded
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: GlobalTheme.spacing.md,
    gap: GlobalTheme.spacing.md,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
