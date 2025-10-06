import { useQuery, useMutation } from "@tanstack/react-query";
import { getServiceTypes, syncUserServiceTypes, getUserServiceTypeIds } from "@db/supabase/queries/service_type";
import { useAuthStore } from "@db/store/useAuthStore";

export function useServiceTypes() {
  return useQuery({
    queryKey: ["service_type"],
    queryFn: getServiceTypes,
  });
}

export function useSyncUserServiceTypes(userIdOverride?: string) {
  const user = useAuthStore((store) => store.user);
  const userId = userIdOverride ?? user?.id;
  if (!userId) throw new Error("User ID is required");

  return useMutation({
    mutationFn: async (selectedIds: number[]) => {
      await syncUserServiceTypes(userId, selectedIds);
    },
  });
}

export function useUserServiceTypeIds(userIdOverride?: string) {
  const user = useAuthStore((store) => store.user);
  const userId = userIdOverride ?? user?.id;
  if (!userId) throw new Error("User ID is required");

  return useQuery({
    queryKey: ["user_service_types", userId],
    queryFn: () => getUserServiceTypeIds(userId),
  });
}