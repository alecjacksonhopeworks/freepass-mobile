import { Ionicons } from "@expo/vector-icons";

export type Resource = {
  id: string;
  name: string;
  description: string;
  image: any;
  favorite: boolean;
};

export type Ionicon = keyof typeof Ionicons.glyphMap;
