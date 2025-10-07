import React from "react";
import { View, StyleSheet } from "react-native";
import { StyledText } from "@components/StyledText";
import { GlobalTheme } from "@constants/global-themes";
import { Contact } from "@db/supabase/types";


//TODO: add styling for ResourceContactsList

export default function ResourceContactsList({
  contacts,
}: {
  contacts: Contact[];
}) {
  if (!contacts.length) return null;

  return (
    <View style={styles.card}>
      <StyledText
        text="Contacts"
        font="h5"
        weight="bold"
        style={styles.title}
      />
      {contacts.map((contact, idx) => (
        <View key={idx} style={styles.contactBox}>
          {contact.label && <StyledText text={contact.label} font="medium" />}
          <StyledText
            text={`${contact.first_name || ""} ${contact.last_name || ""}`.trim()}
            font="medium"
          />
          {contact.phone && <StyledText text={contact.phone} font="medium" />}
          {contact.email && <StyledText text={contact.email} font="medium" />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalTheme.colors.white,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.md,
    marginBottom: GlobalTheme.spacing.md,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  title: {
    marginBottom: GlobalTheme.spacing.xs,
  },
  contactBox: {
    backgroundColor: GlobalTheme.colors.whiteInactive,
    borderRadius: GlobalTheme.radius.md,
    padding: GlobalTheme.spacing.sm,
    marginBottom: GlobalTheme.spacing.xs,
  },
});