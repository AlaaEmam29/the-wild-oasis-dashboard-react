import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useFilterSortApi } from "../../hooks/useFilterSortApi";
import { usePaginationApi } from "../../hooks/usePaginationApi";
import { PAGINATIONLENGTH } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const { filter, sort } = useFilterSortApi(
    "status",
    "all",
    "sortBy",
    "startDate-desc",
  );
  const { currentPage: page } = usePaginationApi();
  const {
    isLoading,
    data: { bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });
  let pageCount = Math.ceil(count / PAGINATIONLENGTH);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
