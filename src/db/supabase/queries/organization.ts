import { SupabaseClient } from "@db/supabase/client";
import { Organization } from "@db/supabase/types";

export async function getOrganizationById(
  organizationId: number
): Promise<Organization> {
  const { data, error } = await SupabaseClient.from("organization")
    .select("*")
    .eq("id", organizationId)
    .single();

  if (error) throw error;

  return data;
}
