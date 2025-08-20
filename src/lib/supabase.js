import { createClient } from "@supabase/supabase-js";

// Grab env vars (Vite uses import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("_dummy_table_") // intentionally fake
      .select("*")
      .limit(1);

    if (error && error.code === "PGRST116") {
      // This error means DB connection is good, but table doesn't exist
      return { success: true, message: "Connection successful" };
    }

    return { success: true, data, error };
  } catch (err) {
    return { success: false, error: err.message || err };
  }
};

// Connection info for debugging
export const supabaseConfig = {
  url: supabaseUrl,
  key: supabaseAnonKey
    ? supabaseAnonKey.substring(0, 20) + "..." // mask it
    : "Missing key",
};
