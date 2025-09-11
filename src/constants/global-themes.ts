// theme.ts
// Centralized theme file for FreePass app
// Provides strongly typed styles for consistency

export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type ThemeFontWeight = "regular" | "medium" | "semibold" | "bold";

export type ThemeFontFamily = "system" | "heading" | "body" | "monospace";

type GlobalColorTheme = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  background: string;
  text: string;
  black: string;
  white: string;
  whiteInactive: string;
  gray: string;
  error: string;
};

type GlobalSpacingTheme = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
};

type GlobalRadiusTheme = {
  sm: number;
  md: number;
  lg: number;
  full: number;
};

type GlobalTypographyTheme = {
  h1: TypographyEntry;
  h2: TypographyEntry;
  h3: TypographyEntry;
  large: TypographyEntry;
  medium: TypographyEntry;
  small: TypographyEntry;
  error: TypographyEntry;
};

export type TypographyEntry = {
  fontSize: number;
  fontWeight: ThemeFontWeight;
  fontFamily: string;
  color?: string;
};

export type GlobalFonts = {
  weights: Record<ThemeFontWeight, string>;
  families: Record<ThemeFontFamily, string>;
};

export type GlobalTheme = {
  colors: GlobalColorTheme;
  spacing: GlobalSpacingTheme;
  radius: GlobalRadiusTheme;
  typography: GlobalTypographyTheme;
};

export const GlobalFonts: GlobalFonts = {
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  families: {
    system: "System",
    heading: "Poppins-Bold",
    body: "Poppins-Regular",
    monospace: "Courier",
  },
};

export const GlobalTheme: GlobalTheme = {
  colors: {
    primary: "#B84F2B",
    primaryDark: "#822000",
    primaryLight: "#bf6040",
    secondary: "#F28F38",
    secondaryLight: "#FFC067",
    text: "#333333",
    background: "#FFFFFF",
    black: "#000000",
    white: "#FFFFFF",
    whiteInactive: "#F3F4F6",
    gray: "#9CA3AF",
    error: "#f2545b",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    h2: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    h3: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    large: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "Inter",
    },
    medium: {
      fontSize: 14,
      fontWeight: "medium",
      fontFamily: "Inter",
    },
    error: {
      fontSize: 12,
      fontWeight: "medium",
      fontFamily: "Inter",
      color: "#f2545b",
    },
    small: {
      fontSize: 12,
      fontWeight: "regular",
      fontFamily: "Inter",
    },
  },
} as const satisfies GlobalTheme;

export type ThemeColor = keyof typeof GlobalTheme.colors;
export type ThemeFont = keyof typeof GlobalTheme.typography;
export type ThemeSpacing = keyof typeof GlobalTheme.spacing;
export type ThemeRadius = keyof typeof GlobalTheme.radius;
