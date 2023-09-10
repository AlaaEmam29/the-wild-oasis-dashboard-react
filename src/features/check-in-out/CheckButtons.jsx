import React, { useContext } from "react";
import Button from "../../ui/Button";
import { styled } from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "../detailsBooking/useBookingDetails";
import { useCheckIn } from "./useCheckIn";
import { useContextCheck } from "../../context/useContextCheck";
import { useSettings } from "../settings/useSettings";
const StyledBookingButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2rem;
`;
export default function CheckButtons({ breakfast }) {
  const moveBack = useMoveBack();
  const { booking } = useBookingDetails();
  const { id: bookingId, hasBreakfast, totalPrice } = booking;
  const { confirmPaid } = useContextCheck();

  const { isCheckIn, checkIn } = useCheckIn();

  const handleCheckIn = () => {
    if (!confirmPaid) return;
    if (hasBreakfast) {
      checkIn({
        bookingId,
        dataBreakfast: {
          hasBreakfast: true,
          fees: breakfast,
          totalPrice: breakfast + totalPrice,
        },
      });
    } else {
      checkIn({ bookingId, dataBreakfast: {} });
    }
  };
  return (
    <StyledBookingButtons type="flex">
      <Button disabled={!confirmPaid || isCheckIn} onClick={handleCheckIn}>
        Check In Booking #{bookingId}
      </Button>

      <Button variation="secondary" onClick={moveBack}>
        Back
      </Button>
    </StyledBookingButtons>
  );
}
