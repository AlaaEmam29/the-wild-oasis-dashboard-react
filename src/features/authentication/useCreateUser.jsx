import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";
export function useCreateUser() {
  const { isLoading, mutate: createUser } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address.",
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createUser };
}
