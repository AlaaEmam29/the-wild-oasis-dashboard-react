import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUserData as updateUserDataApi } from "../../services/apiAuth";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserDataApi,
    onSuccess: (data) => {
      toast.success("User account successfully update it.");
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
