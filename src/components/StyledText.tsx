import React from "react";
import { Text, TextStyle, TextProps, StyleSheet } from "react-native";
import { FontWeight, GlobalTheme, ThemeColor, ThemeFont } from "@constants/global-themes";

export type StyledTextProps = TextProps & {
  text: string | undefined;
  color?: ThemeColor; 
  font?: ThemeFont; 
  style?: TextStyle; 
  weight?: FontWeight;
};

export function StyledText({
  text,
  color = "black",
  font = "medium",
  weight,
  style,
  ...rest
}: StyledTextProps) {
  const textStyles: TextStyle = {
    ...styles.text,
    color: GlobalTheme.colors[color],
    ...GlobalTheme.typography[font],
  };

  if (weight) textStyles.fontWeight = weight

  return text && <Text style={[textStyles, style]} {...rest}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    width: "auto",
    textAlign: "center",
  },
});
