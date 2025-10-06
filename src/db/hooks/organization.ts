import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "@db/supabase/queries/organization";
import { Organization } from "@db/supabase/types";

export function useOrganization(organizationId: number) {
  return useQuery<Organization>({
    queryKey: ["organization", organizationId],
    queryFn: () => getOrganizationById(organizationId),
    enabled: !!organizationId
  });
}