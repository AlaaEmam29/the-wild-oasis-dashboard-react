import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createEditCabin as createCabinApi } from "../../services/apiCabins";
export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("Cabin Successfully added it");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
