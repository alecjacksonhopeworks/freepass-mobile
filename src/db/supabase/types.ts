import * as SupabaseTypes from '@db/supabase/gen_types'

export type ServiceType = Omit<
  SupabaseTypes.Database["public"]["Tables"]["service_type"]["Row"],
  "created_at" | "updated_at"
>;

export type PrivateUser = SupabaseTypes.Database["public"]["Tables"]["private_user"]["Row"];
export type UserSettings = SupabaseTypes.Database["public"]["Tables"]["user_settings"]["Row"];