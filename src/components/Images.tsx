import React from "react";
import { Image, ImageProps } from "react-native";


export default function AppImage(props: ImageProps) {
  return (
    <Image {...props}/>
  );
}

export function BannerImage({style, ...rest}: ImageProps) {
  return (
    <AppImage
      source={require("../../assets/login-banner.png")}
      style={[{width: "100%", height: 150}, style]}
      resizeMode="cover"
      {...rest}
    />
  );
}

export function FreepassLogoImage({style, ...rest}: ImageProps) {
  return (
    <AppImage
      source={require("../../assets/freepass-logo.png")}
      style={[{width: 50, height: 50, alignSelf: "center"}, style]}
      resizeMode="contain"
      {...rest}
    />
  );
}
