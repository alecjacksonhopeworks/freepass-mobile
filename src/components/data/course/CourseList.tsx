import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler'

import CourseCard, { Course } from "./CourseCard";

interface CourseListProps {
  courses: Course[];
  style?: any;
}

export default function CourseList({ courses, style }: CourseListProps) {
  return (
    <View style={[styles.list, style]}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    maxHeight: 300
  },
});
