import React from "react";
import HeaderBooking from "../features/detailsBooking/HeaderBooking";
import { useBookingDetails } from "../features/detailsBooking/useBookingDetails";
import Loader from "../ui/Loader";
import BookingDataContainer from "../features/detailsBooking/BookingDataContainer";
import BookingButtons from "../features/detailsBooking/BookingButtons";
import Empty from "../ui/Empty";
export default function DetailsBookings() {
  const { isLoading, booking } = useBookingDetails();
  if (isLoading) {
    return <Loader />;
  }
  if (!booking)
    return (
      <Empty>{`No details to display. Maybe it's not a valid booking ID.`}</Empty>
    );

  return (
    <>
      <HeaderBooking />
      <BookingDataContainer />
      <BookingButtons />
    </>
  );
}
