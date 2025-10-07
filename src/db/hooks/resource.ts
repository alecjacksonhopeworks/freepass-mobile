import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  searchResources,
  favoriteResource,
  unfavoriteResource,
  getResource,
  getResourceAddresses,
  getResourceContacts,
  getResourceServiceTypes,
  getResourceDetails,
  getResourceMapDetails,
} from "@db/supabase/queries/resource";
import {
  Address,
  Contact,
  Resource,
  ResourceDetails,
  ResourceMapDetails,
  ResourceSearchParams,
  ResourceSearchResult,
  ResourceServiceType,
} from "@db/supabase/types";
import { useAuthStore } from "@db/store/useAuthStore";

export function useSearchResources(
  params: ResourceSearchParams
): UseQueryResult<ResourceSearchResult[], Error> {
  return useQuery({
    queryKey: ["searchResources", params],
    queryFn: () => searchResources(params),
    enabled: !!params,
  });
}

export function useFavoriteResource() {
  const queryClient = useQueryClient();
  const session = useAuthStore((store) => store.session);
  let userId = session?.user.id;

  return useMutation({
    mutationFn: (resourceId: number) => {
      if (!userId) throw new Error("User not logged in");
      return favoriteResource(userId, resourceId);
    },
    onSuccess: (_, resourceId) => {
      updateResourceFavoriteInSearchCache(queryClient, resourceId, false);
    },
  });
}
export function useUnfavoriteResource() {
  const queryClient = useQueryClient();
  const session = useAuthStore((store) => store.session);
  let userId = session?.user.id;

  return useMutation({
   mutationFn: (resourceId: number) => {
      if (!userId) throw new Error("User not logged in");
      return unfavoriteResource(userId, resourceId);
    },
    onSuccess: (_, resourceId) => {
      updateResourceFavoriteInSearchCache(queryClient, resourceId, false);
    },
  });
}

export function useResource(
  resourceId: number
): UseQueryResult<Resource, Error> {
  return useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () => getResource(resourceId),
    enabled: !!resourceId,
  });
}

export function useResourceAddresses(
  resourceId: number
): UseQueryResult<Address[], Error> {
  return useQuery({
    queryKey: ["resource_addresses", resourceId],
    queryFn: () => getResourceAddresses(resourceId),
    enabled: !!resourceId,
  });
}

export function useResourceContacts(
  resourceId: number
): UseQueryResult<Contact[], Error> {
  return useQuery({
    queryKey: ["resource_contacts", resourceId],
    queryFn: () => getResourceContacts(resourceId),
    enabled: !!resourceId,
  });
}

export function useResourceServiceTypes(
  resourceId: number
): UseQueryResult<ResourceServiceType[], Error> {
  return useQuery({
    queryKey: ["resource_service_types", resourceId],
    queryFn: () => getResourceServiceTypes(resourceId),
    enabled: !!resourceId,
  });
}

function updateResourceFavoriteInSearchCache(
  queryClient: QueryClient,
  resourceId: number,
  isFavorited: boolean
) {
  const queries = queryClient
    .getQueryCache()
    .findAll({ queryKey: ["searchResources"] });

  queries.forEach((query) => {
    queryClient.setQueryData(query.queryKey, (oldData: any) => {
      if (!oldData) return oldData;

      return oldData.map((resource: any) =>
        resource.id === resourceId
          ? { ...resource, is_favorited: isFavorited }
          : resource
      );
    });
  });
}

export function useResourceDetails(resourceId: number) : UseQueryResult<ResourceDetails | null, Error> {
  return useQuery({
    queryKey: ['resourceDetails', resourceId],
    queryFn: () => getResourceDetails(resourceId),
    enabled: !!resourceId,
  })
}

export function useResourceMapDetails(
  resourceIds: number[]
): UseQueryResult<ResourceMapDetails[], Error> {
  return useQuery({
    queryKey: ["resource_map_details", resourceIds],
    queryFn: () => getResourceMapDetails(resourceIds),
    enabled: !!resourceIds,
  });
}

