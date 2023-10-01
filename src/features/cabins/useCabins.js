import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useFilterSortApi } from "../../hooks/useFilterSortApi";
import { usePaginationApi } from "../../hooks/usePaginationApi";
import { PAGINATIONLENGTH } from "../../utils/constants";

export function useCabins() {
  const queryClient = useQueryClient();
  const { filter, sort } = useFilterSortApi(
    "discount",
    "all",
    "sortBy",
    "startDate-asc",
  );
  const { currentPage: page } = usePaginationApi();

  const {
    isLoading,
    data: { cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sort, page],
    queryFn: () => getCabins({ filter, sort, page }),
  });
  let pageCount = Math.ceil(count / PAGINATIONLENGTH);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sort, page + 1],
      queryFn: () => getCabins({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sort, page - 1],
      queryFn: () => getCabins({ filter, sort, page: page - 1 }),
    });
  }

  return { isLoading, error, cabins, count };
}
