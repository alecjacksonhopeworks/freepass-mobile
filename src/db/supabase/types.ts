import * as SupabaseTypes from "@db/supabase/gen_types";


export type Address = Omit<
  SupabaseTypes.Database["public"]["Tables"]["address"]["Row"],
  "created_at" | "updated_at"
>;

export type Contact = Omit<
  SupabaseTypes.Database["public"]["Tables"]["contact"]["Row"],
  "created_at" | "updated_at"
>;

export type ServiceType = Omit<
  SupabaseTypes.Database["public"]["Tables"]["service_type"]["Row"],
  "created_at" | "updated_at"
>;

export type PrivateUser =
  SupabaseTypes.Database["public"]["Tables"]["private_user"]["Row"];

export type PrivateUserUpdate = Omit<
  SupabaseTypes.Database["public"]["Tables"]["private_user"]["Update"],
  "user_id" | "created_at" | "updated_at"
>;

export type UserSettings =
  SupabaseTypes.Database["public"]["Tables"]["user_settings"]["Row"];

export type SignUpState =
  (typeof SupabaseTypes.Constants.public.Enums.sign_up_state)[number];


  export type Resource = Omit<
  SupabaseTypes.Database["public"]["Tables"]["resource"]["Row"],
  "created_at" | "updated_at"
>;

export type Organization = Omit<
  SupabaseTypes.Database["public"]["Tables"]["organization"]["Row"],
  "created_at" | "updated_at"
>;

export type ResourceServiceType = {
  service_type_id: number;
  resource_id: number;
  service_type_name: string;
};

export type UserFavoriteResource = {
  user_id: string;
  resource_id: number;
};

export type ResourceSearchResult = {
  resource_id: number;
  resource_name: string;
  resource_description: string | null;
  org_logo_uri: string | null;
  is_favorited: boolean;
};

export type ResourceSearchParams = {
  search_text?: string;
  input_service_type_id?: number;
  input_user_id?: string;
  only_favorites: boolean;
};

export type ResourceDetails = {
  resource: Resource,
  organization: Organization,
  contacts: Contact[]
  address: Address
  serviceTypes: ServiceType[]
}