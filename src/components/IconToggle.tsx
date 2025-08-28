import React, { useState, useEffect } from "react";
import { Pressable, ViewStyle, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "../constants/global-themes";

type IconToggleProps = {
  isOn: boolean;
  onPress: () => void;
  iconOn: keyof typeof Ionicons.glyphMap;
  iconOff: keyof typeof Ionicons.glyphMap;
  size?: number;
  colorOn?: string;
  colorOff?: string;
  style?: ViewStyle;
  loading?: boolean;
  loadingDelay?: number; // milliseconds delay before showing indicator
};

export default function IconToggle({
  isOn,
  onPress,
  iconOn,
  iconOff,
  size = 24,
  colorOn = GlobalTheme.colors.secondary,
  colorOff = GlobalTheme.colors.gray,
  style,
  loading = false,
  loadingDelay = 200,
}: IconToggleProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => setShowLoading(true), loadingDelay);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timeout);
  }, [loading, loadingDelay]);

  return (
    <Pressable onPress={onPress} style={style} disabled={loading}>
      {showLoading ? (
        <ActivityIndicator size={size} color={colorOn} />
      ) : (
        <Ionicons
          name={isOn ? iconOn : iconOff}
          size={size}
          color={isOn ? colorOn : colorOff}
        />
      )}
    </Pressable>
  );
}