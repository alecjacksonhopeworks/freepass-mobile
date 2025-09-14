import React from "react";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, router, useRouter } from "expo-router";
import { GlobalTheme } from "@constants/global-themes";
import { StyledText } from "./StyledText";
import { Ionicon } from "@constants/types";
import { DrawerNavigationHelpers } from "node_modules/@react-navigation/drawer/lib/typescript/src/types";
import { useSignOut } from "@db/hooks/auth";
import { FreepassLogoImage } from "@components/Images";
import { useAuthStore } from "@db/store/useAuthStore";
import StyledButton from "./StyledButton";
import Spacer from "./Spacer";

type CustomDrawerItemContent = {
  href: string;
  label: string;
  icon: Ionicon;
  doInstead?: () => void;
};

type CustomDrawerItemProps = {
  content: CustomDrawerItemContent;
  navigation: DrawerNavigationHelpers;
};

export function CustomDrawerItem({
  content,
  navigation,
}: CustomDrawerItemProps) {
  const currentPathname = usePathname();
  return (
    <DrawerItem
      icon={() => (
        <Ionicons
          name={content.icon}
          size={25}
          color={
            currentPathname === content.href
              ? GlobalTheme.colors.secondaryLight
              : GlobalTheme.colors.white
          }
        />
      )}
      label={content.label}
      labelStyle={[
        styles.navItemLabel,
        {
          color:
            currentPathname === content.href
              ? GlobalTheme.colors.secondaryLight
              : GlobalTheme.colors.white,
        },
      ]}
      style={{
        backgroundColor:
          currentPathname === content.href
            ? GlobalTheme.colors.primaryDark
            : GlobalTheme.colors.primary,
        borderRadius: GlobalTheme.radius.sm,
      }}
      onPress={() => {
        if (content.doInstead) {
          content.doInstead();
        } else {
          router.push(content.href);
          navigation?.closeDrawer();
        }
      }}
    />
  );
}

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { mutate: signOut } = useSignOut(() => router.replace('/login'));
  const privateUser = useAuthStore((store) => store.privateUser);

  const drawerItems: CustomDrawerItemContent[] = [
    { href: "/profile", label: "Profile", icon: "person" },
    { href: "/user-guide", label: "User Guide", icon: "book" },
    { href: "/your-calendar", label: "Your Calendar", icon: "calendar" },
    { href: "/settings", label: "Settings", icon: "settings" },
    {
      href: "/login",
      label: "Sign Out",
      icon: "settings",
      doInstead: signOut,
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <FreepassLogoImage />
        <StyledText
          text={privateUser?.email}
          font="h6"
          color="white"
          style={{ marginTop: GlobalTheme.spacing.md }}
        />
        <StyledButton
          leftIcon="chevron-forward-outline"
          noBackground
          onPress={() => props.navigation.closeDrawer()}
          style={{ marginTop: GlobalTheme.spacing.lg }}
        />
      </View>
      <View style={styles.drawerItemsContainer}>
        {drawerItems.map((item) => (
          <CustomDrawerItem
            key={item.href}
            content={item}
            navigation={props.navigation}
          />
        ))}
      </View>
      <Spacer spacing="xl" />
      <View style={styles.infoContainer}>
        <StyledText
          text="FreePass Financial Literacy Access"
          font="medium"
          weight="bold"
          color="primary"
        />
        <StyledText
          text="Here’s where you can learn how to use FreePass, 
                and gain access to our certification classes. 
                Head on over to our Academy to get the latest tips & tricks!"
          font="small"
          color="primary"
        />
        <StyledButton
          text="Learn More"
          color="secondary"
          leftIcon="open-outline"
          width="100%"
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    ...GlobalTheme.typography.large,
    fontWeight: "bold",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: GlobalTheme.spacing.md,
    paddingHorizontal: GlobalTheme.spacing.md,
    paddingVertical: GlobalTheme.spacing.md,
    borderBottomColor: GlobalTheme.colors.white,
    borderBottomWidth: 1.2,
  },
  drawerItemsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: GlobalTheme.spacing.sm,
    paddingVertical: GlobalTheme.spacing.md,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: GlobalTheme.spacing.md,
    borderRadius: GlobalTheme.radius.sm,
    paddingVertical: GlobalTheme.spacing.md,
    paddingHorizontal: GlobalTheme.spacing.md,
    backgroundColor: GlobalTheme.colors.white,
  },
});
