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
  noBackground?: boolean
  buttonStyles?: ViewStyle;
  font?: ThemeFont,
  textColor?: ThemeColor,
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
    rounded = false,
    noBackground = false,
    buttonStyles,
    font = "medium",
    textColor = "white",
    textStyle,
    width = "auto",
    leftIcon,
    rightIcon,
    iconSize = 18,
    iconColor,
    ...rest
  } = props;

  const [disabled, setDisabled] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    if (!props.onPress || disabled) return;
    let onPress = props.onPress!;
    onPress(event);
    setDisabled(true);
    setTimeout(() => setDisabled(false), delay);
  };

  const borderStyles = rounded ? styles.rounded : styles.box;
  const backgroundColor = noBackground ? undefined : GlobalTheme.colors[color]
  const allButtonStyles: ViewStyle = {
    width,
    ...styles.button,
    ...borderStyles,
    backgroundColor,
    ...buttonStyles,
  };

  const textStyles: TextStyle = {
    ...GlobalTheme.typography[font],
    color: GlobalTheme.colors[textColor],
    fontWeight: 'bold',
    ...textStyle
  }

  return (
    <Pressable
      style={allButtonStyles}
      {...rest}
      onPress={handlePress}
      disabled={disabled}
    >
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={iconSize}
          color={iconColor || GlobalTheme.colors.white}
          style={{ marginRight: GlobalTheme.spacing.xs }}
        />
      )}
      <Text style={textStyles}>{text}</Text>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={iconSize}
          color={iconColor || GlobalTheme.colors.white}
          style={{ marginLeft: GlobalTheme.spacing.xs }}
        />
      )}
    </Pressable>
  );
}

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rounded: {
    borderRadius: GlobalTheme.radius.lg,
  },
  box: {
    borderRadius: GlobalTheme.radius.sm,
  }
});
