import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { GlobalTheme } from "@constants/global-themes";

export type LabeledTextInputProps = TextInputProps & {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function LabeledTextInput(props: LabeledTextInputProps) {
  const { label, containerStyle, inputStyle, labelStyle, ...textInputProps } =
    props;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput style={[styles.input, inputStyle]} {...textInputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: GlobalTheme.spacing.xs,
    width: "100%",
  },
  label: {
    ...GlobalTheme.typography.medium,
    color: GlobalTheme.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderRadius: GlobalTheme.radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: GlobalTheme.colors.primary,
    width: "100%",
  },
});
