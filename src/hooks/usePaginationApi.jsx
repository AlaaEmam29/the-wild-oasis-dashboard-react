import { useSearchParams } from "react-router-dom";
import { PAGINATIONLENGTH } from "../utils/constants";

export function usePaginationApi(totalPages = 1) {
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
