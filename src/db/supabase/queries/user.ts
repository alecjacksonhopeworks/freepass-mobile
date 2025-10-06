import { SupabaseClient } from "@db/supabase/client";
import {
  PrivateUser,
  PrivateUserUpdate,
  UserSettings,
} from "@db/supabase/types";

export async function signIn(email: string, password: string) {
  const { error } = await SupabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in signIn:",
      error?.message || error
    );
    throw error;
  }
}

export async function signUp(email: string, password: string) {
  const { data, error } = await SupabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in signUp:",
      error?.message || error
    );
    throw error;
  }
  return data;
}

export async function signOut() {
  const { error } = await SupabaseClient.auth.signOut();
  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in signOut:",
      error?.message || error
    );
    throw error;
  }
}

export async function isLoggedIn(): Promise<boolean> {
  const { data: user, error } = await SupabaseClient.auth.getUser();
  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in isLoggedIn:",
      error?.message || error
    );
    throw error;
  }
  return Boolean(user);
}

export async function insertPrivateUser(
  userId: string,
  email: string,
  fullName: string
) {
  const { data, error } = await SupabaseClient.from("private_user")
    .insert([{ id: userId, email, full_name: fullName }])
    .select()
    .single();
  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in insertPrivateUser:",
      error?.message || error
    );
    throw error;
  }
  return data;
}

export async function getPrivateUser(
  userId: string,
  email: string | undefined
): Promise<PrivateUser> {
  const { data, error } = await SupabaseClient.from("private_user")
    .select("*")
    .eq("id", userId)
    .maybeSingle<PrivateUser>();

  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in getPrivateUser:",
      error?.message || error
    );
    throw error;
  }

  if (data) return data;

  try {
    const privateUser = await insertPrivateUser(userId, email || "", "");
    return privateUser;
  } catch (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in getPrivateUser (insert):",
      error
    );
    throw error;
  }
}

export async function updatePrivateUser(
  userId: string,
  updates: PrivateUserUpdate
): Promise<PrivateUser> {
  const { data, error } = await SupabaseClient.from("private_user")
    .update(updates)
    .eq("id", userId)
    .select()
    .single<PrivateUser>();

  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in updatePrivateUser:",
      error?.message || error
    );
    throw error;
  }
  return data;
}

export async function insertUserSettings(
  userId: string
): Promise<UserSettings> {
  const { data, error } = await SupabaseClient.from("user_settings")
    .insert([{ user_id: userId }])
    .select()
    .single<UserSettings>();
  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in insertUserSettings:",
      error?.message || error
    );
    throw error;
  }
  return data || null;
}

export async function getUserSettings(
  userId: string
): Promise<UserSettings> {
  const { data, error } = await SupabaseClient.from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle<UserSettings>();
  if (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in getUserSettings:",
      error?.message || error
    );
    throw error;
  }
  if (data) return data;

  try {
    const userSettings = await insertUserSettings(userId);
    return userSettings;
  } catch (error) {
    console.log(
      "[db/supabase/queries/user.ts] Error in getUserSettings (insert):",
      error
    );
    throw error;
  }
}
