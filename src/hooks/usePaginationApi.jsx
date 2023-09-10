import { useSearchParams } from "react-router-dom";
import { PAGINATIONLENGTH } from "../utils/constants";
import { useEffect } from "react";

export function usePaginationApi(totalPages) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  let pageCount = Math.ceil(totalPages / PAGINATIONLENGTH);

  const handleParams = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return { currentPage, pageCount, handleParams };
}
