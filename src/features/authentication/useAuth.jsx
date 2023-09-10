import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useAuth() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    isLoading,
    error,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
