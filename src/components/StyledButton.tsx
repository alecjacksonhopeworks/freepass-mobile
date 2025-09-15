import React, { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
  DimensionValue,
  GestureResponderEvent,
} from "react-native";
import { GlobalTheme, ThemeColor, ThemeFont } from "@constants/global-themes";
import { Ionicons } from "@expo/vector-icons";

type StyledButtonProps = PressableProps & {
  text?: string;
  color?: ThemeColor;
  rounded?: boolean;
  delay?: number;
  buttonStyles?: ViewStyle;
  noBackground?: boolean;
  font?: ThemeFont;
  textColor?: ThemeColor;
  textStyle?: TextStyle;
  width?: DimensionValue;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};

function StyledButton(props: StyledButtonProps) {
  const {
    text,
    delay = 500,
    color = "primary",
    buttonStyles,
    rounded = false,
    noBackground = false,
    font = "medium",
    textColor = "white",
    textStyle,
    width = "auto",
    leftIcon,
    rightIcon,
    iconSize = 18,
    iconColor,
    style,
    disabled,
    onPress,
    ...rest
  } = props;

  const [delayIsActive, setDelayIsActive] = useState(false);


  const handlePress = (event: GestureResponderEvent) => {
    if (!onPress || disabled || delayIsActive) return;
    onPress(event);
    setDelayIsActive(true);
    setTimeout(() => setDelayIsActive(false), delay);
  };

  const borderStyles = rounded ? styles.rounded : styles.box;
  const backgroundColor = noBackground ? undefined : GlobalTheme.colors[color];

  const textStyles: TextStyle = {
    ...GlobalTheme.typography[font],
    color: GlobalTheme.colors[textColor],
    fontWeight: "bold",
    ...textStyle,
  };

  const allButtonStyles = [
    styles.button,
    borderStyles,
    {
      width,
      backgroundColor,
    },
    buttonStyles,
  ];

  return (
    <Pressable
      style={allButtonStyles}
      onPress={handlePress}
      disabled={disabled || delayIsActive}
      {...rest}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={iconSize}
          color={iconColor || GlobalTheme.colors.white}
          style={{ marginRight: GlobalTheme.spacing.sm }}
        />
      )}
      <Text style={textStyles}>{text}</Text>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={iconSize}
          color={iconColor || GlobalTheme.colors.white}
          style={{ marginLeft: GlobalTheme.spacing.sm }}
        />
      )}
    </Pressable>
  );
}

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rounded: {
    borderRadius: GlobalTheme.radius.lg,
  },
  box: {
    borderRadius: GlobalTheme.radius.sm,
  },
});
