import React from "react";
import Button from "../../ui/Button";
import { styled } from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./useBookingDetails";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Model from "../../ui/Model";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
const StyledBookingButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.2rem;
`;
export default function BookingButtons() {
  const {
    booking: { id: bookingId, status },
  } = useBookingDetails();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const gotToCheckingPage = () => {
    navigate(`/checking/${bookingId}`);
  };
  const { isCheckOut, checkOut } = useCheckOut();
  const handleCheckOut = () => {
    checkOut({ bookingId });
  };
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const handleDeleteBooking = () => {
    deleteBooking(bookingId, {
      onSettled: () => moveBack(),
    });
  };
  return (
    <StyledBookingButtons type="flex">
      {status === "checked-in" && (
        <Button disabled={isCheckOut} onClick={handleCheckOut}>
          {" "}
          Check Out
        </Button>
      )}
      {status === "unconfirmed" && (
        <Button onClick={gotToCheckingPage}> Check In</Button>
      )}
      <Model>
        <Model.Open name="confirmDelete">
          <Button variation="danger">Delete Booking</Button>
        </Model.Open>
        <Model.Container name="confirmDelete">
          <ConfirmDelete
            deleteName="Booking"
            deleteItem={handleDeleteBooking}
            id={bookingId}
            disabled={isDeleting}
          />
        </Model.Container>
      </Model>

      <Button variation="secondary" onClick={moveBack}>
        Back
      </Button>
    </StyledBookingButtons>
  );
}
