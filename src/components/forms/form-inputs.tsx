import { Controller, Control } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import {
  LabeledTextInput,
  LabeledTextInputProps,
} from "@components/LabledTextInput";
import { StyledText } from "@components/StyledText";

type LabledTextFormInputProps = LabeledTextInputProps & {
  control: Control<any, any, any>;
  name: string;
  errorText?: string | undefined;
};

export function TextFormInput(props: LabledTextFormInputProps) {
  const { label, name, control, errorText, ...textInputProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => (
        <View style={[styles.formItemContainer]}>
          <LabeledTextInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...textInputProps}
          />
          <StyledText text={errorText} font="error" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  formItemContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: GlobalTheme.spacing.xs,
    width: "100%",
  },
});
