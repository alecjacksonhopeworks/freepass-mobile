import { SafeAreaView, StyleSheet, View } from "react-native";
import ResourceFilteredSearch from "@components/data/resource/ResourceFilteredSearch";
import { FreepassLogoImage } from "@components/Images";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FreepassLogoImage />
          <StyledText
            text="FreePass Resources"
            color="primary"
            font="large"
            weight="bold"
            style={{ marginTop: GlobalTheme.spacing.md }}
          />
        </View>
        <StyledText
          text="To find relevant services in your area, you may use the Search bar, choose Search by Category, or view Resources near you."
          color="primary"
          font="small"
          style={{ width: "90%" }}
        />

        <ResourceFilteredSearch />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalTheme.colors.background,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: GlobalTheme.spacing.md,
    gap: GlobalTheme.spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: GlobalTheme.spacing.md,
    marginTop: GlobalTheme.spacing.md,
  },
});
