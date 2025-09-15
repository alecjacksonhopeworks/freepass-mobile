import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalTheme } from "@constants/global-themes";
import { StyledText } from "@components/StyledText";

export type Course = {
  id: string;
  name: string;
  description: string;
};

type CourseCardProps = {
  course: Course;
  style?: any;
};

export default function CourseCard({ course, style }: CourseCardProps) {
  return (
    <View style={[styles.card, style]}>
      <StyledText
        text={course.name}
        font="h6"
        color="primary"
        weight="bold"
        style={{ marginBottom: 4 }}
      />
      <StyledText text={course.description} font="medium" color="primaryDark" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalTheme.colors.white,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.md,
    marginRight: GlobalTheme.spacing.md,
    minHeight: 100,
    justifyContent: "center",
    shadowColor: GlobalTheme.colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
