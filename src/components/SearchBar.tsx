import React, { useState } from "react";
import { View, TextInput, StyleSheet, DimensionValue, Keyboard } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalTheme } from "@constants/global-themes";

type SearchBarProps = {
  searchText: string;
  width?: DimensionValue;
  placeholder?: string;
  onSearch: (text: string) => void;
  showIcon?: boolean;

};

export default function SearchBar({
  searchText,
  placeholder,
  onSearch,
  showIcon = false,
  width = "100%",
}: SearchBarProps) {

  const [searchTextValue, setSearchTextValue] = useState<string>(searchText);

  return (
    <View style={[styles.container, { width }]}>
      {showIcon && (
        <FontAwesome
          name="search"
          size={20}
          color={GlobalTheme.colors.gray}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.input, showIcon && { paddingLeft: 36 }]}
        placeholder={placeholder}
        placeholderTextColor={GlobalTheme.colors.gray}
        value={searchTextValue}
        returnKeyType="search"
        onChangeText={setSearchTextValue}
        onSubmitEditing={(e) => {
          Keyboard.dismiss();              
          onSearch(e.nativeEvent.text);                  
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 10,
    top: "50%",
    marginTop: -10,
  },
  input: {
    borderWidth: 1,
    borderColor: GlobalTheme.colors.primary,
    borderRadius: GlobalTheme.radius.lg,
    padding: GlobalTheme.spacing.sm,
  },
});
