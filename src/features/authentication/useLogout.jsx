import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../../utils/constants";
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogout, mutate: userLogout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate(PathConstants.LOGIN, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogout, userLogout };
}
