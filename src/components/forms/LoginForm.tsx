import { StyleSheet, View } from 'react-native'
import React from 'react'
import LabeledTextInput from '@components/LabledTextInput'
import { GlobalTheme } from "@constants/global-themes"
import { useRouter } from 'expo-router';
import StyledButton from '@components/StyledButton';
import { useSignIn } from '@db/hooks/useAuth';
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { StyledText } from '@components/StyledText';

// TODO: Implement validation with react hook form and yup
// TODO: implement login functionality

const schema = yup.object().shape({
  email: yup.string().required("Please enter an email")
    .email("The email you entered is not valid email."),
  password: yup.string()
    .required('Please enter your password.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
})


export default function LoginForm() {
  const router = useRouter();
  const {mutate, error } = useSignIn()

  const { control, handleSubmit, getValues, formState: { errors }} = useForm(
    {
      resolver: yupResolver(schema)
    }
  );

  const onSubmit = (data : {email: string, password: string}) => {
     console.log("validating login data")
     console.log(data)
     return;
     mutate(data)
  }

  return (
    <View style={styles.container}>
      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <View style={styles.formItemContainer}>
            <LabeledTextInput
              inputStyle={styles.input}
              label="Email"
              placeholder="Enter email..."
              placeholderTextColor={GlobalTheme.colors.primary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            <StyledText text={errors.email?.message} font='error'/>
          </View>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <View style={styles.formItemContainer}>
            <LabeledTextInput
              inputStyle={styles.input}
              label="Password"
              placeholder="Enter password..."
              placeholderTextColor={GlobalTheme.colors.primary}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              />
            <StyledText text={errors.password?.message} font='error'/>
          </View>
        )}
      />

      {/* Submit */}
      <View style={styles.formItemContainer}>
        <StyledButton
          buttonStyles={{ marginTop: GlobalTheme.spacing.lg }}
          text="Login"
          width="100%"
          color="secondary"
          rounded={true}
          onPress={handleSubmit(onSubmit, data => console.log('error', getValues()))}
        />
        <StyledText text={""} font='error'/>
      </View>
    </View>
  )
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
    alignItems: 'flex-start',
    gap: GlobalTheme.spacing.xs,
    width: "100%",
  }
})