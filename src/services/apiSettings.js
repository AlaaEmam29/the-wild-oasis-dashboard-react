import supabase from "./supabase";

export async function getSettings() {
  let { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return settings;
}

export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
