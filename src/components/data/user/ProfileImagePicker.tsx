import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GlobalTheme } from "@constants/global-themes";

type Props = {
  onImageSelected: (uri: string) => void;
  initialImage?: string;
};

export default function ProfileImagePicker({ onImageSelected, initialImage }: Props) {
  const [imageUri, setImageUri] = useState<string | undefined>(initialImage);

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: GlobalTheme.spacing.md,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: GlobalTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: GlobalTheme.colors.secondaryLight,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  placeholderText: {
    color: GlobalTheme.colors.primary,
    textAlign: "center",
  },
});
