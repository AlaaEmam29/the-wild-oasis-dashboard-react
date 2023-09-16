import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { CreateNewBooking as CreateNewBookingApi } from "../../services/apiBookings";
export function useCreateBookings() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: CreateNewBookingApi,
    onSuccess: () => {
      toast.success("Bookings Successfully added it");

      queryClient.invalidateQueries({
        queryKey: ["bookings" ],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
}
