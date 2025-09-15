import { ServiceTypeDropdown } from "@components/dropdowns/ServiceTypeDropdown";
import { GlobalTheme } from "@constants/global-themes";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import CourseList from "./CourseList";
import { StyledText } from "@components/StyledText";

type Course = {
  id: string;
  name: string;
  description: string;
};

const defaultCourses: Course[] = [
  {
    id: "1",
    name: "Budgeting Basics",
    description: "Learn how to manage your finances and create a budget.",
  },
  {
    id: "2",
    name: "Job Readiness",
    description: "Prepare for employment with resume and interview skills.",
  },
  {
    id: "3",
    name: "Credit Building",
    description: "Understand credit scores and how to improve them.",
  },
  {
    id: "4",
    name: "Healthy Living",
    description: "Tips for maintaining physical and mental health.",
  },
  {
    id: "5",
    name: "Legal Rights",
    description: "Know your rights and resources for legal support.",
  },
];

function CourseFilteredSearch() {
  const [courses] = useState<Course[]>(defaultCourses);
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);

  // TODO: Add Database intergration for course list

  return (
    <View style={styles.filterContainer}>

      <StyledText
        text="Browse Courses by Category"
        font="h6"
        color="primary"
        weight="bold"
        style={styles.text}
      />
      <ServiceTypeDropdown
        onChange={setServiceType}
        value={serviceType}
        width="100%"
      />
      <CourseList
        courses={courses}
        style={{ marginTop: GlobalTheme.spacing.md}}
      />
      </View>
  );
}

export default CourseFilteredSearch;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    paddingVertical: GlobalTheme.spacing.lg,
  },
  text: {
    textAlign: "left",
    width: "100%",
  },
});
