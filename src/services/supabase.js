import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://aunmfvfoxzcgayvtuiiy.supabase.co";
export const supabaseImagePathStorage =
  "https://aunmfvfoxzcgayvtuiiy.supabase.co/storage/v1/object/public";
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
