import React from "react";
import { Text, TextStyle, StyleSheet, DimensionValue } from "react-native";
import { GlobalTheme, ThemeColor, ThemeFont } from "../constants/global-themes";

type StyledTextProps = {
  text: string;
  color?: ThemeColor; // theme color keys
  font?: ThemeFont; // theme font size keys
  width?: DimensionValue; // number (dp) or string (%) for width
  style?: TextStyle; // additional custom styles
};

export function StyledText({
  text = "Default Text",
  color = "black",
  font = "medium",
  width,
  style,
}: StyledTextProps) {
  const textStyles: TextStyle = {
    color: GlobalTheme.colors[color],
    ...GlobalTheme.typography[font],
    width: width,
  };

  return <Text style={[textStyles, style]}>{text}</Text>;
}