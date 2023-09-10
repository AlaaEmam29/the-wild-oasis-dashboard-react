import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "../../utils/constants";
export function useAuthLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: userLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("User Successfully Login");

      queryClient.setQueryData(["user"], data.user);
      navigate(PathConstants.DASHBOARD, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, userLogin };
}
