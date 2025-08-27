import React from "react";
import { Text, TextStyle, StyleSheet, DimensionValue } from "react-native";
import { GlobalTheme } from "../constants/global-themes";

type StyledTextProps = {
  text: string;
  color?: keyof typeof GlobalTheme.colors; // theme color keys
  size?: keyof typeof GlobalTheme.typography; // theme font size keys
  width?: DimensionValue; // number (dp) or string (%) for width
  style?: TextStyle; // additional custom styles
};

export function StyledText({
  text = "Default Text",
  color = "black",
  size = "medium",
  width,
  style,
}: StyledTextProps) {
  const textStyles: TextStyle = {
    color: GlobalTheme.colors[color],
    ...GlobalTheme.typography[size],
    width: width,
  };

  return <Text style={[textStyles, style]}>{text}</Text>;
}