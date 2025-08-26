// theme.ts
// Centralized theme file for FreePass app
// Provides strongly typed styles for consistency

export type ColorTheme = {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  text: string;
  black: string;
  white: string;
};

export type SpacingTheme = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type RadiusTheme = {
  sm: number;
  md: number;
  lg: number;
  full: number;
};

export type TypographyTheme = {
  large: {
    fontSize: number;
    fontWeight: "bold";
    fontFamily: string;
  };
  medium: {
    fontSize: number;
    fontWeight: "600";
    fontFamily: string;
  };
  small: {
    fontSize: number;
    fontWeight: "normal";
    fontFamily: string;
  };
};

export type GlobalTheme = {
  colors: ColorTheme;
  spacing: SpacingTheme;
  radius: RadiusTheme;
  typography: TypographyTheme;
};

export const GlobalTheme: GlobalTheme = {
  colors: {
    primary: "#B84F2B",
    primaryDark: "#822000",
    secondary: "#F28F38",
    secondaryLight: "#FFC067",
    text: "#333333",
    background: "#FFFFFF",
    black: "#000000",
    white: "#FFFFFF",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    large: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    medium: {
      fontSize: 14,
      fontWeight: "600",
      fontFamily: "Inter",
    },
    small: {
      fontSize: 12,
      fontWeight: "normal",
      fontFamily: "Inter",
    },
  },
};

