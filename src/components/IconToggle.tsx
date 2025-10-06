import React, { useState, useEffect } from "react";
import { Pressable, ViewStyle, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes";
import { Ionicon } from "@constants/types";

type IconToggleProps = {
  isOn: boolean;
  onPress: () => void;
  iconOn: Ionicon;
  iconOff: Ionicon;
  size?: number;
  colorOn?: string;
  colorOff?: string;
  style?: ViewStyle;
  loadingDelay?: number;
};

export default function IconToggle({
  isOn,
  onPress,
  iconOn,
  iconOff,
  size = 24,
  colorOn = GlobalTheme.colors.primary,
  colorOff = GlobalTheme.colors.primary,
  style,
  loadingDelay = 500,
}: IconToggleProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timeout: number;
    if (loading) {
      timeout = setTimeout(() => setLoading(false), loadingDelay);
    } 
    return () => clearTimeout(timeout);
  }, [loading]);

  const handlePress = () => {
    if (!loading) {
      onPress();
      setLoading(true);
    }
  }

  return (
    <Pressable onPress={handlePress} style={style} disabled={loading}>
      {loading ? (
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
