import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FreepassLogoImage } from "../../../components/Images";
import { Link } from "expo-router";
import { StyledText } from "../../../components/StyledText";

const defaultResources = [
  {
    id: "1",
    name: "Local Food Bank",
    description: "Provides meals and groceries for those in need.",
    image: null,
    favorite: false,
  },
  {
    id: "2",
    name: "Job Training Center",
    description: "Career development and skills training programs.",
    image: null,
    favorite: true,
  },
  {
    id: "3",
    name: "Community Shelter",
    description: "Temporary housing and support services.",
    image: null,
    favorite: false,
  },
];

export default function Home() {
  const [resources, setResources] = useState(defaultResources);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredResources = resources.filter((r) =>
    showFavorites ? r.favorite : true
  ).filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, favorite: !r.favorite } : r
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo + Quick List */}
      <View style={styles.header}>
        <FreepassLogoImage />
        <Pressable style={styles.quickListButton}>
          <Text style={styles.quickListText}>Quick List</Text>
        </Pressable>
      </View>

      <Link href="/login">
          <StyledText text=" Go Back To Login" color="primaryDark"/>
      </Link>

      {/* Instruction Text */}
      <Text style={styles.instruction}>
        To find relevant services in your area, you may use the Search bar, choose Search by Category, or view Resources near you.
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search resources..."
        value={search}
        onChangeText={setSearch}
      />

      {/* All / Favorites Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setShowFavorites(false)} style={[styles.toggleButton, !showFavorites && styles.toggleActive]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowFavorites(true)} style={[styles.toggleButton, showFavorites && styles.toggleActive]}>
          <Text>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Below are relevant services in your area</Text>

      {/* Find Resources Button */}
      <Pressable style={styles.findButton}>
        <Text style={styles.findButtonText}>Find Resources Near Me Now</Text>
      </Pressable>

      {/* Resource List */}
      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.resourceCard}>
            <Image style={styles.resourceImage} />
            <View style={styles.resourceText}>
              <Text style={styles.resourceName}>{item.name}</Text>
              <Text style={styles.resourceDesc}>{item.description}</Text>
            </View>
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <FontAwesome
                name={item.favorite ? "star" : "star-o"}
                size={24}
                color={item.favorite ? "#FFD700" : "#ccc"}
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  quickListButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  quickListText: {
    color: "#fff",
    fontWeight: "bold",
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  toggleActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  findButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  findButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
  },
  resourceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  resourceText: {
    flex: 1,
  },
  resourceName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  resourceDesc: {
    fontSize: 14,
    color: "#666",
  },
});