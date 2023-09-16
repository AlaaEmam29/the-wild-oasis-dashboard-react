import { format } from "date-fns";
import { PAGINATIONLENGTH } from "../utils/constants";
import supabase from "./supabase";
import { getToday } from "../utils/helper";
import { useBookings } from "../features/bookings/useBookings";

export async function getBookings({ filter, sort, page }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(name, email)", { count: "exact" });
  if (filter) query = query.eq(filter.field, filter.value);

  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

  if (page) {
    const from = (page - 1) * PAGINATIONLENGTH;
    const to = from + PAGINATIONLENGTH - 1;
    if (from >= 0 && to >= from) {
      query = query.range(from, to);
    }
  }
  const { data: bookings, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { bookings, count };
}
export async function getBookingDetails({ id }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(*)")
    .eq("id", id)
    .single();

  const { data: booking, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return booking;
}

export async function checkingInOut(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function deleteBooking(id) {
  const { error, data } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const getBookingsAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, fees")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const getStaysAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(*)")
    .gte("created_at", date)
    .lte("created_at", getToday());
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export async function getStaysTodayActivity() {
  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select("*, guests(name, nationality, countryFlag)")
  //   .or(
  //     `and(status.eq.unconfirmed,startDate.eq.${format(new Date(), "yyyy-MM-dd")}),and(status.eq.checked-in,endDate.eq.${format(new Date(), "yyyy-MM-dd")})`,
  //   )
  //   .order("created_at");
  // if (error) {
  //   throw new Error(error.message);
  // }

  // return data;
  const today = format(new Date(), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, countryFlag)")
    .filter("startDate", "lte", today)
    .filter("endDate", "gte", today)
    .or("status.eq.unconfirmed,status.eq.checked-in")
    .order("created_at");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function CreateNewBooking(obj) {
  const { data, error } = await supabase.from("bookings").insert([obj]).select();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getLastIDBooking () {
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);
  if (error) {
    throw new Error(error.message);
  }

  return data ? data[0].id : 0;
}