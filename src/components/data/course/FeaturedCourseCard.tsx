import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import { StyledText } from "@components/StyledText";


export type FeaturedCourseCardProps = {
  name: string;
  image: any;
  style?: any;
};

export default function FeaturedCourseCard({
  name,
  image,
  style,
}: FeaturedCourseCardProps) {
  return (
    <ImageBackground
      source={image}
      style={[styles.card, style]}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />
      <StyledText
        text={name}
        font="h6"
        color="white"
        weight="bold"
        style={styles.text}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 150,
    borderRadius: GlobalTheme.radius.md,
    overflow: "hidden",
    marginRight: GlobalTheme.spacing.md,
    justifyContent: "flex-end",
  },
  image: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  text: {
    padding: GlobalTheme.spacing.md,
    textAlign: "left",
    fontSize: 18,
  },
});
