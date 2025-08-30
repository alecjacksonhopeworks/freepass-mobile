import React from 'react';
import {View, DimensionValue} from 'react-native';
import { GlobalTheme, ThemeSpacing } from "@constants/global-themes";

type SpacerProps = 
  | { size: DimensionValue; spacing?: never; horizontal?: boolean }
  | { size?: never; spacing: ThemeSpacing; horizontal?: boolean };  

export default function ({horizontal = false, size, spacing} : SpacerProps) {
  size =  spacing ? GlobalTheme.spacing[spacing] : size;
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: !horizontal ? size : 'auto',
      }}
    />
  );
};

