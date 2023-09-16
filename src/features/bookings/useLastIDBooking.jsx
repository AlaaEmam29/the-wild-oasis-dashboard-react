import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings, getLastIDBooking } from "../../services/apiBookings";

export function useLastIDBooking() {

  const {
    isLoading,
    data : lastID,
    error,
  } = useQuery({
    queryKey: ["last-id-booking "],
    queryFn: getLastIDBooking
  });

  return { isLoading, error, lastID };
}
