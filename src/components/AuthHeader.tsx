import React from "react";
import { StyledText } from "./StyledText";
import { BannerImage, FreepassLogoImage } from "./Images";
import { View, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";

export type AuthHeaderProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

function AuthHeader({ title, subtitle, children }: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BannerImage />
        <FreepassLogoImage />
        <StyledText text={title} color="white" font="large" />
        <StyledText text={subtitle} color="white" />
      </View>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalTheme.colors.background,
    flexDirection: "column",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: GlobalTheme.colors.primary,
    paddingTop: GlobalTheme.spacing.xl,
    paddingBottom: GlobalTheme.spacing.md,
    gap: GlobalTheme.spacing.md,
  },
});

export default AuthHeader;
