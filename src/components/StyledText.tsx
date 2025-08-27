import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";
import { GlobalTheme, ThemeColor, ThemeFont } from "../constants/global-themes";

export type StyledTextProps = TextStyle & {
  text: string;
  color?: ThemeColor; // theme color keys
  font?: ThemeFont; // theme font size keys
  style?: TextStyle; // additional custom styles
};

export function StyledText({
  text = "Default Text",
  color = "black",
  font = "medium",
  style,
}: StyledTextProps) {
  const textStyles: TextStyle = {
    ...styles.text,
    color: GlobalTheme.colors[color],
    ...GlobalTheme.typography[font],
  };

  return <Text style={[textStyles, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    width: 'auto',
    textAlign: 'center'
  },
});