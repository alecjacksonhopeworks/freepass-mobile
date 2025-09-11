import { createClient } from "@supabase/supabase-js";
import SecureStorage from "@db/supabase/secure-storage";
import "react-native-get-random-values";

const supabaseUrl = "https://xpncttmgdzcwnrzuxnss.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwbmN0dG1nZHpjd25yenV4bnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzAzODQsImV4cCI6MjA3MTgwNjM4NH0.t-mXDFDBXlvL447F8qMU0uASMciJ0SHyKIRKSES3XC8";

export const SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SecureStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
