import { format } from "date-fns";
import { PAGINATIONLENGTH } from "../utils/constants";
import supabase from "./supabase";
import { getToday } from "../utils/helper";

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

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");
      
  if (error) {
    throw new Error(error.message);
  }
  const dummyData = [
    {
        "id": 59,
        "created_at": "2023-08-16T00:00:00+00:00",
        "startDate": "2023-09-03T00:00:00",
        "endDate": "2023-09-04T00:00:00",
        "numberOfNight": 1,
        "numberOfGuest": 1,
        "cabinPrice": 418.77,
        "fees": 19.74,
        "totalPrice": 438.51,
        "status": "checked-in",
        "hasBreakfast": true,
        "isPaid": true,
        "observation": "Weight kitchen American involve power what.",
        "cabinId": 17,
        "guestId": 3,
        "guests": {
            "name": "Mrs. Kimberly Lopez",
            "nationality": "Palau",
            "countryFlag": "🇺🇸"
        }
    },
    {
        "id": 23,
        "created_at": "2023-09-04T00:00:00+00:00",
        "startDate": "2023-08-31T00:00:00",
        "endDate": "2023-09-06T00:00:00",
        "numberOfNight": 6,
        "numberOfGuest": 3,
        "cabinPrice": 243.86,
        "fees": 33.84,
        "totalPrice": 1497,
        "status": "checked-in",
        "hasBreakfast": false,
        "isPaid": true,
        "observation": "Ball leader number land thought begin career.",
        "cabinId": 13,
        "guestId": 7,
        "guests": {
            "name": "Cody Munoz",
            "nationality": "Ghana",
            "countryFlag": "🇨🇦"
        }
    },
    {
        "id": 56,
        "created_at": "2023-09-24T00:00:00+00:00",
        "startDate": "2023-09-04T00:00:00",
        "endDate": "2023-09-09T00:00:00",
        "numberOfNight": 5,
        "numberOfGuest": 4,
        "cabinPrice": 114.47,
        "fees": 25.36,
        "totalPrice": 597.71,
        "status": "unconfirmed",
        "hasBreakfast": false,
        "isPaid": true,
        "observation": "Cost east beat couple serious kitchen exactly.",
        "cabinId": 13,
        "guestId": 16,
        "guests": {
            "name": "Laura Morgan",
            "nationality": "Norway",
            "countryFlag": "🇬🇧"
        }
    },
    {
        "id": 101,
        "created_at": "2023-10-25T00:00:00+00:00",
        "startDate": "2023-10-01T00:00:00",
        "endDate": "2023-10-07T00:00:00",
        "numberOfNight": 6,
        "numberOfGuest": 6,
        "cabinPrice": 419.08,
        "fees": 33.23,
        "totalPrice": 2547.71,
        "status": "checked-in",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Return last former support serious sure leg.",
        "cabinId": 26,
        "guestId": 24,
        "guests": {
            "name": "Gerald Park",
            "nationality": "Estonia",
            "countryFlag": "🇫🇷"
        }
    },
    {
        "id": 95,
        "created_at": "2023-12-16T00:00:00+00:00",
        "startDate": "2023-10-10T00:00:00",
        "endDate": "2023-10-11T00:00:00",
        "numberOfNight": 1,
        "numberOfGuest": 1,
        "cabinPrice": 318.42,
        "fees": 43.87,
        "totalPrice": 362.29,
        "status": "checked-in",
        "hasBreakfast": true,
        "isPaid": false,
        "observation": "Wide accept thousand prevent.",
        "cabinId": 14,
        "guestId": 6,
        "guests": {
            "name": "Christopher Cruz",
            "nationality": "Wallis and Futuna",
            "countryFlag": "🇨🇳"
        }
    },
    {
        "id": 38,
        "created_at": "2024-01-03T00:00:00+00:00",
        "startDate": "2023-09-27T00:00:00",
        "endDate": "2023-09-28T00:00:00",
        "numberOfNight": 1,
        "numberOfGuest": 5,
        "cabinPrice": 145.79,
        "fees": 42.63,
        "totalPrice": 188.42,
        "status": "checked-in",
        "hasBreakfast": true,
        "isPaid": true,
        "observation": "How crime house number late cost recent.",
        "cabinId": 22,
        "guestId": 27,
        "guests": {
            "name": "Tiffany Merritt",
            "nationality": "Marshall Islands",
            "countryFlag": "🇨🇳"
        }
    },
    {
        "id": 33,
        "created_at": "2024-01-20T00:00:00+00:00",
        "startDate": "2023-07-30T00:00:00",
        "endDate": "2023-08-05T00:00:00",
        "numberOfNight": 6,
        "numberOfGuest": 5,
        "cabinPrice": 421.11,
        "fees": 29.41,
        "totalPrice": 2556.07,
        "status": "unconfirmed",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Car investment keep soon spring only billion.",
        "cabinId": 11,
        "guestId": 1,
        "guests": {
            "name": "Tammy Thompson",
            "nationality": "Jordan",
            "countryFlag": "🇬🇧"
        }
    },
    {
        "id": 46,
        "created_at": "2024-04-15T00:00:00+00:00",
        "startDate": "2023-10-07T00:00:00",
        "endDate": "2023-10-09T00:00:00",
        "numberOfNight": 2,
        "numberOfGuest": 1,
        "cabinPrice": 292.59,
        "fees": 21.07,
        "totalPrice": 606.25,
        "status": "unconfirmed",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Share fall art machine follow human travel.",
        "cabinId": 18,
        "guestId": 15,
        "guests": {
            "name": "Walter Johnson",
            "nationality": "Guernsey",
            "countryFlag": "🇮🇹"
        }
    },
    {
        "id": 116,
        "created_at": "2024-05-26T00:00:00+00:00",
        "startDate": "2023-07-31T00:00:00",
        "endDate": "2023-08-04T00:00:00",
        "numberOfNight": 4,
        "numberOfGuest": 4,
        "cabinPrice": 457.13,
        "fees": 18.66,
        "totalPrice": 1847.18,
        "status": "unconfirmed",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Share impact assume under poor vote stay.",
        "cabinId": 21,
        "guestId": 26,
        "guests": {
            "name": "Rhonda Jackson",
            "nationality": "Switzerland",
            "countryFlag": "🇪🇸"
        }
    },
    {
        "id": 106,
        "created_at": "2024-06-08T00:00:00+00:00",
        "startDate": "2023-08-11T00:00:00",
        "endDate": "2023-08-21T00:00:00",
        "numberOfNight": 10,
        "numberOfGuest": 3,
        "cabinPrice": 423.52,
        "fees": 16,
        "totalPrice": 4251.2,
        "status": "checked-in",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Face baby however something.",
        "cabinId": 9,
        "guestId": 13,
        "guests": {
            "name": "Diane Clark",
            "nationality": "Bahrain",
            "countryFlag": "🇯🇵"
        }
    },
    {
        "id": 60,
        "created_at": "2024-07-05T00:00:00+00:00",
        "startDate": "2023-07-31T00:00:00",
        "endDate": "2023-08-05T00:00:00",
        "numberOfNight": 5,
        "numberOfGuest": 1,
        "cabinPrice": 379.3,
        "fees": 42.07,
        "totalPrice": 1938.57,
        "status": "unconfirmed",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Girl girl open physical poor.",
        "cabinId": 5,
        "guestId": 2,
        "guests": {
            "name": "Bryan Morales",
            "nationality": "Cote d'Ivoire",
            "countryFlag": "🇦🇺"
        }
    },
    {
        "id": 76,
        "created_at": "2024-07-18T00:00:00+00:00",
        "startDate": "2023-09-27T00:00:00",
        "endDate": "2023-10-06T00:00:00",
        "numberOfNight": 9,
        "numberOfGuest": 5,
        "cabinPrice": 179.36,
        "fees": 39.8,
        "totalPrice": 1654.04,
        "status": "checked-in",
        "hasBreakfast": true,
        "isPaid": false,
        "observation": "Draw board campaign boy blood.",
        "cabinId": 18,
        "guestId": 9,
        "guests": {
            "name": "Vincent Miller",
            "nationality": "Pitcairn Islands",
            "countryFlag": "🇪🇸"
        }
    },
    {
        "id": 15,
        "created_at": "2024-08-01T00:00:00+00:00",
        "startDate": "2023-08-21T00:00:00",
        "endDate": "2023-08-30T00:00:00",
        "numberOfNight": 9,
        "numberOfGuest": 3,
        "cabinPrice": 304.45,
        "fees": 10.09,
        "totalPrice": 2750.14,
        "status": "checked-in",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Year there dream eye.",
        "cabinId": 24,
        "guestId": 16,
        "guests": {
            "name": "Laura Morgan",
            "nationality": "Norway",
            "countryFlag": "🇬🇧"
        }
    },
    {
        "id": 119,
        "created_at": "2024-12-19T00:00:00+00:00",
        "startDate": "2023-08-05T00:00:00",
        "endDate": "2023-08-07T00:00:00",
        "numberOfNight": 2,
        "numberOfGuest": 5,
        "cabinPrice": 107.01,
        "fees": 43.68,
        "totalPrice": 257.7,
        "status": "unconfirmed",
        "hasBreakfast": true,
        "isPaid": false,
        "observation": "Woman something behavior end also through.",
        "cabinId": 19,
        "guestId": 11,
        "guests": {
            "name": "Christopher Roberts",
            "nationality": "Lebanon",
            "countryFlag": "🇯🇵"
        }
    },
    {
        "id": 85,
        "created_at": "2024-12-20T00:00:00+00:00",
        "startDate": "2023-09-13T00:00:00",
        "endDate": "2023-09-19T00:00:00",
        "numberOfNight": 6,
        "numberOfGuest": 6,
        "cabinPrice": 293.51,
        "fees": 44.51,
        "totalPrice": 1805.57,
        "status": "checked-in",
        "hasBreakfast": false,
        "isPaid": false,
        "observation": "Event sell view occur black professor pressure.",
        "cabinId": 19,
        "guestId": 22,
        "guests": {
            "name": "Alexander Long",
            "nationality": "Greenland",
            "countryFlag": "🇨🇦"
        }
    }
]
  return data.length > 0 ?data : dummyData
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

