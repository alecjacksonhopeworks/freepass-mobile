import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useResourceDetails } from "@db/hooks/resource";
import ResourceInfoCard from "@components/data/resource/ResourceInfoCard";
import OrganizationCard from "@components/data/resource/OrganizationCard";
import AddressDisplay from "@components/data/resource/AddressDisplay";
import ResourceContactsList from "@components/data/resource/ResourceContactsList";
import ResourceServiceTypeCard from "@components/data/resource/ResourceServiceTypeCard";
import { GlobalTheme } from "@constants/global-themes";


//TODO: add styling for ResourceDetails


export default function ResourceDetailPage() {
  const { id } = useLocalSearchParams();
  const resourceId = Number(id);
  const { data, error } = useResourceDetails(resourceId);

  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ResourceInfoCard
        resource={data.resource}
        logo_uri={data.organization?.logo_uri}
      />
      <OrganizationCard organization={data.organization} />
      <ResourceServiceTypeCard serviceTypes={data.serviceTypes || []} />
      <AddressDisplay address={data.address} />
      <ResourceContactsList contacts={data.contacts || []} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: GlobalTheme.spacing.lg,
    gap: GlobalTheme.spacing.lg,
  },
});
