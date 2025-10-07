import { SupabaseClient } from "@db/supabase/client";
import {
  Resource,
  ResourceSearchResult,
  Address,
  Contact,
  ResourceServiceType,
  ResourceSearchParams,
  ResourceDetails,
  ResourceMapDetails,
} from "@db/supabase/types";

export async function searchResources(
  params: ResourceSearchParams
): Promise<ResourceSearchResult[]> {
  const { data, error } = await SupabaseClient.rpc("search_resources", {
    input_user_id: params.input_user_id ?? null,
    search_text: params.search_text ?? null,
    only_favorites: params.only_favorites,
    input_service_type_id: params.input_service_type_id ?? null,
  });

  if (error) throw error;

  return (data || []) as ResourceSearchResult[];
}

export async function favoriteResource(userId: string, resourceId: number) {
  const { error } = await SupabaseClient.from("user_favorite_resource").upsert({
    user_id: userId,
    resource_id: resourceId,
  });
  console.log("Favorite resource error:", error);
  if (error) throw error;
}

export async function unfavoriteResource(userId: string, resourceId: number) {
  const { error } = await SupabaseClient.from("user_favorite_resource")
    .delete()
    .eq("user_id", userId)
    .eq("resource_id", resourceId);
  console.log("Unfavorite resource error:", error);
  if (error) throw error;
}

export async function getResource(resourceId: number): Promise<Resource> {
  const { data, error } = await SupabaseClient.from("resource")
    .select("*")
    .eq("id", resourceId)
    .single();
  if (error) throw error;
  return data as Resource;
}

export async function getResourceAddresses(
  resourceId: number
): Promise<Address[]> {
  const { data, error } = await SupabaseClient.from("address")
    .select("*")
    .eq("resource_id", resourceId);
  if (error) throw error;
  return data as Address[];
}

export async function getResourceContacts(
  resourceId: number
): Promise<Contact[]> {
  const { data, error } = await SupabaseClient.from("contact")
    .select("*")
    .eq("organization_id", resourceId);
  if (error) throw error;
  return data as Contact[];
}

export async function getResourceServiceTypes(
  resourceId: number
): Promise<ResourceServiceType[]> {
  const { data, error } = await SupabaseClient.from("resource_service_type")
    .select("resource_id, service_type_id, service_type(name)")
    .eq("resource_id", resourceId);

  if (error) throw error;

  return (data || []).map((row: any) => ({
    resource_id: row.resource_id,
    service_type_id: row.service_type_id,
    service_type_name: row.service_type?.name || "",
  }));
}

export async function getResourceDetails(
  resourceId: number
): Promise<ResourceDetails | null> {
  const { data, error } = await SupabaseClient.rpc("get_resource_details", {
    input_resource_id: resourceId,
  });

  if (error) throw error;

  return data as ResourceDetails;
}

export async function getResourceMapDetails(
  resourceIds: number[]
): Promise<ResourceMapDetails[]> {
  const { data, error } = await SupabaseClient.from("resource")
    .select(
      `
      *,
      address:address_id(*) 
    `
    )
    .in("id", resourceIds);

  if (error) throw error;

  return (data || []).map((row: any) => ({
    resource: {
      id: row.id,
      name: row.name,
      description: row.description,
      hours: row.hours,
      logo_uri: row.logo_uri,
      organization_id: row.organization_id,
      address_id: row.address_id,
    } as Resource,
    address: row.address as Address,
  }));
}
