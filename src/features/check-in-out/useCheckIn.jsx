import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { checkingInOut as checkingInOutApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isCheckIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, dataBreakfast }) =>
      checkingInOutApi(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...dataBreakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckIn, checkIn };
}
