import React from "react";
import { View, StyleSheet } from "react-native";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import { Address } from "@db/supabase/types";

export default function AddressDisplay({
  address,
}: {
  address: Address;
}) {
  return (
    <View style={styles.card}>
      <StyledText text="Address" font="h5" weight="bold" style={styles.title} />
      <View style={styles.addressBox}>
        {address.label && <StyledText text={address.label} font="medium" />}
        {address.address_line1 && (
          <StyledText text={address.address_line1} font="medium" />
        )}
        {address.address_line2 && (
          <StyledText text={address.address_line2} font="medium" />
        )}
        <StyledText
          text={`${address.city || ""}${address.city && address.state ? ", " : ""}${address.state || ""} ${address.zip_code || ""}`.trim()}
          font="medium"
        />
        {address.country && <StyledText text={address.country} font="medium" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalTheme.colors.white,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.md,
    marginBottom: GlobalTheme.spacing.md,
  },
  title: {
    marginBottom: GlobalTheme.spacing.xs,
  },
  addressBox: {
    backgroundColor: GlobalTheme.colors.whiteInactive,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.sm,
  },
});
