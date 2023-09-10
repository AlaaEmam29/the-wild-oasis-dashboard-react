import { getBookingsAfterDate as getBookingsAfterDateApi } from "../../services/apiBookings";
import { useFilterSortApi } from "../../hooks/useFilterSortApi";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
export function useBookingsAfterDate() {
  const { filter: numDays } = useFilterSortApi("last", "7");
  const date = subDays(new Date(), Number(numDays.value)).toISOString();
  const {
    data: recentBookings,
    error,
    isLoading: isRecentLoading,
  } = useQuery({
    queryFn: () => getBookingsAfterDateApi(date),
    queryKey: ["bookings", `last-${numDays.value}`],
  });
  const daysCount = Number(numDays?.value) || 0;

  return { recentBookings, error, isRecentLoading, daysCount };
}
