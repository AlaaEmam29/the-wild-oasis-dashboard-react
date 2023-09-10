import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate as getStaysAfterDateApi } from "../../services/apiBookings";
import { useFilterSortApi } from "../../hooks/useFilterSortApi";
import { subDays } from "date-fns";

export function useStaysAfterDate() {
  const { filter: numDays } = useFilterSortApi("last", "7");
  const date = subDays(new Date(), Number(numDays.value)).toISOString();
  const {
    data: staysAfterDate,
    error,
    isLoading: isStaysLoading,
  } = useQuery({
    queryFn: () => getStaysAfterDateApi(date),
    queryKey: ["stays", `last-${numDays.value}`],
  });
  const ConfirmedStays = staysAfterDate?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );
  const daysCount = Number(numDays?.value) || 0;
  return { staysAfterDate, error, isStaysLoading, ConfirmedStays, daysCount };
}
