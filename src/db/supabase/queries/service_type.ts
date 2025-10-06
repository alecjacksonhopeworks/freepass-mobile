import { SupabaseClient } from "@db/supabase/client";
import { ServiceType } from "@db/supabase/types";

export async function getServiceTypes(): Promise<ServiceType[]> {
  const { data, error } = await SupabaseClient.from("service_type").select(
    "id, name, description, icon"
  );
  if (error) throw error;
  return data!;
}

export async function getUserServiceTypeIds(userId: string): Promise<number[]> {
  const { data, error } = await SupabaseClient.from("user_service_types")
    .select("service_type_id")
    .eq("user_id", userId);
  if (error) throw error;
  return data?.map((d: any) => d.service_type_id) ?? [];
}

export async function syncUserServiceTypes(userId: string, selectedIds: number[]) {
  const { error: deleteError } = await SupabaseClient.from("user_service_types")
    .delete()
    .eq("user_id", userId)
    .not("service_type_id", "in", `(${selectedIds.join(",")})`);
  if (deleteError) throw deleteError;

  const rows = selectedIds.map((id) => ({ user_id: userId, service_type_id: id }));
  const { error: upsertError } = await SupabaseClient.from("user_service_types").upsert(rows, {
    onConflict: "user_id,service_type_id",
  });
  if (upsertError) throw upsertError;
}