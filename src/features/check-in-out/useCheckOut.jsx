import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { checkingInOut as checkingInOutApi } from "../../services/apiBookings";
export function useCheckOut() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckOut, mutate: checkOut } = useMutation({
    mutationFn: ({ bookingId }) =>
      checkingInOutApi(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckOut, checkOut };
}
