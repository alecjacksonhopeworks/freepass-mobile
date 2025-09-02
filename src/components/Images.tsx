import React from "react";
import { Image, ImageProps, ImageStyle } from "react-native";
import { GlobalTheme } from "@constants/global-themes";

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

export function FreepassLogoImage({size = 50, ...props}: FreepassLogoImageProps) {

  let style: ImageStyle = {
    width: size,
    height: size,
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

export type ProfileImageProps = ImageProps & { size?: number };

export function ProfileImage({size = 50, ...props}: FreepassLogoImageProps) {

  let style: ImageStyle = {
    width: size,
    height: size,
    alignSelf: "center",
    borderRadius: GlobalTheme.radius.full
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
