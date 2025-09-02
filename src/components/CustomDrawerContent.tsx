import React from "react";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {  usePathname, router } from "expo-router";
import { GlobalTheme } from "@constants/global-themes";
import { ProfileImage } from "./Images";
import { StyledText } from "./StyledText";
import { Ionicon } from "@constants/types";
import { DrawerNavigationHelpers } from "node_modules/@react-navigation/drawer/lib/typescript/src/types";


export type CustomDrawerItemProps = {
  href: string;
  label: string;
  icon: Ionicon;
  navigation: DrawerNavigationHelpers
};

export function CustomDrawerItem({ href, label, icon, navigation }: CustomDrawerItemProps) {
  const currentPathname = usePathname();
  return (
    <DrawerItem
        icon={() => (
          <Ionicons
            name={icon}
            size={25}
            color={currentPathname === href ? GlobalTheme.colors.white : GlobalTheme.colors.black}
          />
        )}
        label={label}
        labelStyle={[
          styles.navItemLabel,
          { color: currentPathname === href ? GlobalTheme.colors.white : GlobalTheme.colors.black },
        ]}
        style={{
          backgroundColor:
            currentPathname === href ? GlobalTheme.colors.primaryDark : GlobalTheme.colors.white,
        }}
        onPress={() => {
          router.push(href)
          navigation.closeDrawer()
        }}
      />
  );
};




export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const pathname: string = usePathname();

  const drawerItems = [
  { href: "/profile", label: "Profile", icon: "person-outline" },
  { href: "/user-guide", label: "User Guide", icon: "book-outline" },
  { href: "/your-calendar", label: "Your Calendar", icon: "calendar-outline" },
  { href: "/settings", label: "Settings", icon: "settings-outline" },
];

  return (
    <DrawerContentScrollView {...props}>
      {/* User Info */}
      <View style={styles.userInfoWrapper}>
        <ProfileImage size={60} />
        <View style={styles.userDetailsWrapper}>
          <StyledText text="John Doe" style={styles.userName}/>
          <StyledText text="john@email.com" style={styles.userEmail}/>
        </View>
      </View>

       {drawerItems.map((item) => (
        <CustomDrawerItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon as Ionicon}
          navigation={props.navigation}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    ...GlobalTheme.typography.medium,
    fontSize: 16,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: GlobalTheme.colors.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userDetailsWrapper: {
    marginLeft: 12,
  },
  userName: {
    ...GlobalTheme.typography.medium,
    fontSize: 16,
    color: GlobalTheme.colors.black,
  },
  userEmail: {
    ...GlobalTheme.typography.medium,
    fontSize: 14,
    color: GlobalTheme.colors.white,
  },
});