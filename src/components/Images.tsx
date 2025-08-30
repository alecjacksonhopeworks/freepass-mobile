import React from "react";
import { Image, ImageProps, ImageStyle } from "react-native";

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

export type FreepassLogoImageProps = ImageProps & { size?: number };

export function FreepassLogoImage({size, ...props}: FreepassLogoImageProps) {

  let style: ImageStyle = {
    width: size ?? 50,
    height: size ?? 50,
    alignSelf: "center"
  }

  return (
    <AppImage
      source={require("../../assets/freepass-logo.png")}
      style={style}
      resizeMode="contain"
      {...props}
    />
  );
}
