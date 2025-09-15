import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler'
import  { Course } from "./CourseCard";
import FeaturedCourseCard from "./FeaturedCourseCard";
import { GlobalTheme } from "@constants/global-themes";

interface FeaturedCourseListProps {
  courses: Course[];
  style?: any;
}

export default function FeaturedCourseList({
  courses,
  style,
}: FeaturedCourseListProps) {
  return (
    <View style={[styles.list, style]}>
      <FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeaturedCourseCard name={item.name} image={undefined} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    marginLeft: GlobalTheme.spacing.md    
  },
});
