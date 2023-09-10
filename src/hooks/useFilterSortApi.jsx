import { useSearchParams } from "react-router-dom";

export function useFilterSortApi(
  fieldFilter = "",
  defaultFilter = "",
  fieldSort = "",
  defaultSort = "",
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const getQueryParamValue = (paramName, defaultValue) => {
    const paramValue = searchParams.get(paramName);
    return paramValue !== null && paramValue !== defaultValue
      ? paramValue
      : paramName === "last"
      ? 7
      : null;
  };
  const filterValue = getQueryParamValue(fieldFilter, defaultFilter);
  const sortValue = getQueryParamValue(fieldSort, defaultSort);

  const parseSortValue = (sortValue) => {
    if (!sortValue) return null;
    const [field, direction] = sortValue.split("-");
    return { field, direction };
  };

  const filter = filterValue
    ? { field: fieldFilter, value: filterValue }
    : null;
  const sort = parseSortValue(sortValue);

  return { filter, sort };
}
