import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
export function useBookingDetails() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingDetails({ id: bookingId }),
    retry: false,
  });

  return { isLoading, error, booking };
}
