import { useQuery } from "@tanstack/react-query";
import { SupabaseClient } from "@db/supabase/client";

export function useResourceMapTiles() {
  return useQuery<string, Error>({
    queryKey: ["user-resource-map"],
    queryFn: async () => {
      const { data } = await SupabaseClient
        .storage
        .from("demo_map")
        .getPublicUrl("map.pmtiles"); 
      return data.publicUrl;
    }
  });
}
