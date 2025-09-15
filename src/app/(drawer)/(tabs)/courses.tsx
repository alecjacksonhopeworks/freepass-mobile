import { View, StyleSheet, FlatList } from "react-native";
import { StyledText } from "@components/StyledText";
import StyledButton from "@components/StyledButton";
import { GlobalTheme } from "@constants/global-themes";
import FeaturedCourseList from "@components/data/course/FeaturedCourseList";
import CourseFilteredSearch from "@components/data/course/CourseFilteredSearch";

const sampleCourses = [
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

export default function Courses() {
  return (
    <FlatList
      data={[{ key: "course-filtered-search" }]}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.scrollContainer}
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <StyledText
                text="The Foundation Fund"
                font="large"
                color="primaryDark"
                weight="bold"
              />
              <StyledText
                text="Learning Academy"
                font="h6"
                color="primary"
                weight="bold"
              />
            </View>
            <StyledText
              text="You can browse Courses from the FreePass Learning Academy below. 
              There is infomational media on different Life Skills topics, 
              and Guides to help you along on common re-entry tasks."
              font="medium"
              color="primaryDark"
              style={styles.leftAlignText}
            />
            <StyledText
              text="Are You a New User to FreePass?"
              font="h5"
              color="primary"
              weight="bold"
              style={styles.leftAlignText}
            />
            <StyledText
              text="Welcome! Our staff gas complied a short how-to guide of using the FreePass app. 
              This will help you navigate throughout FreePass to find information, 
              get connected with The Fountain Fund, and be involved with community programs and events."
              font="medium"
              color="primaryDark"
              style={styles.leftAlignText}
            />
            <StyledButton text="VIEW NEW USER GUIDE" color="secondary" />
            <StyledButton
              text="WHAT IS THE LEARNING ACADEMY?"
              color="primaryDark"
            />
            <StyledText
              text="Financial Literacy Platform"
              font="h5"
              color="primary"
              weight="bold"
              style={styles.leftAlignText}
            />
            <StyledText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat."
              font="medium"
              color="primaryDark"
              style={styles.leftAlignText}
            />
            <StyledText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              font="medium"
              color="primaryDark"
              style={styles.leftAlignText}
            />
            <View style={styles.grid}>
              <View style={styles.gridRow}>
                <StyledButton
                  text="COLLECTIONS"
                  color="secondary"
                  buttonStyles={styles.gridButton}
                />
                <StyledButton
                  text="COACHING"
                  color="primaryDark"
                  buttonStyles={styles.gridButton}
                />
              </View>
              <View style={styles.gridRow}>
                <StyledButton
                  text="CALCULATORS"
                  color="primaryDark"
                  buttonStyles={styles.gridButton}
                />
                <StyledButton
                  text="ALL COURSES"
                  color="secondary"
                  buttonStyles={styles.gridButton}
                />
              </View>
            </View>
          </View>
          <View style={styles.featuredSection}>
            <View style={styles.textContainer}>
              <StyledText
                text="Featured Courses"
                font="h5"
                color="white"
                weight="bold"
                style={styles.leftAlignText}
              />
              <StyledText
                text="Here are some courses that have been selected by Staff for you to prepare your re-entry journey or work alongside The Fountain Fund when applying for a loan. "
                font="medium"
                color="white"
                style={styles.leftAlignText}
              />
            </View>
            <FeaturedCourseList courses={sampleCourses} />
          </View>
          <CourseFilteredSearch />
        </View>
      }
      renderItem={() => null}
      showsVerticalScrollIndicator={false}
    />
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: GlobalTheme.colors.background,
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "column",
    gap: GlobalTheme.spacing.sm,
  },
  infoContainer: {
    width: "90%",
    alignItems: "center",
    gap: GlobalTheme.spacing.md,
    paddingVertical: GlobalTheme.spacing.lg,
  },
  leftAlignText: {
    textAlign: "left",
    width: "100%",
  },
  grid: {
    width: "100%",
    gap: GlobalTheme.spacing.lg,
  },
  gridRow: {
    flexDirection: "row",
    gap: GlobalTheme.spacing.lg,
    width: "100%",
    justifyContent: "center",
  },
  gridButton: {
    width: "40%",
  },
  featuredSection: {
    width: "100%",
    backgroundColor: GlobalTheme.colors.primary,
    paddingVertical: GlobalTheme.spacing.md,
    gap: GlobalTheme.spacing.sm,
    alignItems: "center",
  },
  textContainer: { width: "90%", gap: GlobalTheme.spacing.sm },
});
