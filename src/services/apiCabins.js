import { PAGINATIONLENGTH } from "../utils/constants";
import supabase, { supabaseImagePathStorage, supabaseUrl } from "./supabase";

export async function getCabins({ filter, sort, page }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });
  if (filter !== null) {
    if (filter.value === "with-discount") {
      query = query.gt(filter.field, 0);
    }
    if (filter.value === "no-discount") {
      query = query.eq(filter.field, 0);
    }
  }
  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }
  if (page) {
    const from = (page - 1) * PAGINATIONLENGTH;
    const to = from + PAGINATIONLENGTH - 1;
    query = query.range(from, to);
  }

  let { data: cabins, error, count } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return { cabins, count };
}
export async function filterByDiscount(status) {
  const { data, error } = await supabase
    .from("cabins")
    .select()
    .filter("discount", status, 0);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCabins(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createEditCabin(newCabin, id = undefined) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseImagePathStorage}/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    throw new Error(error.message);
  }

  if (hasImagePath) return data;

  const { error: errorCabinsStorage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (errorCabinsStorage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(errorCabinsStorage.message);
  }
  return data;
}
