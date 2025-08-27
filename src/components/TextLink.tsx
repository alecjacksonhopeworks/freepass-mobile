// TextLink.tsx
import React from "react";
import { Link, LinkProps } from "expo-router";
import { StyledText, StyledTextProps } from "./StyledText";
import { TextStyle } from "react-native";

type TextLinkProps = LinkProps & StyledTextProps & {
  textStyles?: TextStyle
  noUnderline?: boolean;
};

export function TextLink({noUnderline = false, textStyles, ...props}: TextLinkProps) {
  // Separate Link props and StyledText props
  const {
    text,
    color,
    font,
    ...linkProps
  } = props;

  const textStyle : TextStyle = {
    textDecorationLine: noUnderline ? "none" : "underline",
    ...textStyles,
  };

  return (
    <Link {...linkProps}>
      <StyledText
        text={text}
        color={color}
        font={font}
        style={textStyle}
      />
    </Link>
  );
}