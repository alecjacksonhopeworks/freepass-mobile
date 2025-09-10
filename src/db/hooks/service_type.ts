// hooks/useServiceTypes.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { SupabaseClient } from "@db/supabase/client";
import { ServiceType } from "@db/supabase/types"
import { useAuthStore } from "@db/store/useAuthStore";

export function useServiceTypes() {
   return useQuery<ServiceType[]>({
    queryKey: ["service_types"],
    queryFn: async () => {         
      const { data, error } = await SupabaseClient
        .from("service_type")
        .select("id, name, description, icon");

      if (error) throw error;

      return data!;
    },
  });
}




export function useSyncUserServiceTypes(userIdOverride?: string) {
  const user = useAuthStore((state) => state.user);
  const userId = userIdOverride ?? user?.id;
  
  if (!user?.id) throw new Error("User not logged in");

  return useMutation({
    mutationFn: async (selectedIds: number[]) => {
      if (!userId) throw new Error("User ID is required");

      const { error: deleteError } = await SupabaseClient
        .from("user_service_types")
        .delete()
        .eq("user_id", userId)
        .not("service_type_id", "in", `(${selectedIds.join(",")})`);

      if (deleteError) throw deleteError;

      const rows = selectedIds.map((id) => ({
        user_id: userId,
        service_type_id: id,
      }));

      const { error: upsertError } = await SupabaseClient
        .from("user_service_types")
        .upsert(rows, { onConflict: "user_id,service_type_id" });

      if (upsertError) throw upsertError;
    },
  });
}