import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import React, { useState } from "react";
import { DimensionValue, Keyboard, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";

export type DropdownChoice = {
  label: string;
  value: string | undefined;
};

export type StyledDropdownProps = {
  choices: DropdownChoice[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  label?: string;
  width?: DimensionValue;
  emptyText?: string;
};

export function StyledDropdown({
  choices,
  value,
  onChange,
  label,
  width,
  emptyText = "All"
}: StyledDropdownProps) {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (label) {
      return <StyledText text={label} color="primary" style={styles.label} />;
    }
    return null;
  };

  // Add empty choice at the top if not already present
  if (emptyText && !choices.some((c) => c.value == undefined && c.label == emptyText)){
    choices.unshift({ label: emptyText, value: undefined }); 
  }

  //TODO: fix navigation bar color change on focus/blur of dropdown
  const handleFocus = () => {
    setIsFocus(true);
    NavigationBar.setBackgroundColorAsync(GlobalTheme.colors.primary);
    NavigationBar.setButtonStyleAsync("light");
  };

  const handleBlur = () => {
    setIsFocus(false);
    NavigationBar.setBackgroundColorAsync(GlobalTheme.colors.primary);
    NavigationBar.setButtonStyleAsync("light");
  };

  return (
    <View style={[styles.container, { width }]}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: GlobalTheme.colors.primary },
        ]}
        autoScroll={false}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={choices}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value || ""}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
          Keyboard.dismiss();
        }}
        renderLeftIcon={() => (
          <Ionicons icon="caret-down-outline" size={20} style={styles.icon} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 16,
  },
  dropdown: {
    height: 35,
    borderColor: GlobalTheme.colors.gray,
    borderWidth: 0.5,
    borderRadius: GlobalTheme.radius.md,
    paddingHorizontal: GlobalTheme.spacing.sm,
    paddingVertical: GlobalTheme.spacing.sm,
  },
  icon: {
    marginRight: GlobalTheme.spacing.xs,
  },
  label: {
    position: "absolute",
    backgroundColor: GlobalTheme.colors.white,
    left: 8,
    top: 8,
    zIndex: 999,
    paddingHorizontal: GlobalTheme.spacing.xs,
    ...GlobalTheme.typography.small,
  },
  placeholderStyle: {
    ...GlobalTheme.typography.medium,
  },
  selectedTextStyle: {
    ...GlobalTheme.typography.medium,
  },
  inputSearchStyle: {
    height: 40,
    ...GlobalTheme.typography.medium,
  },
});
