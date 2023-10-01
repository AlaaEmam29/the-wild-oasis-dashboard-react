import React, { useState } from "react";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import Loader from "../ui/Loader";
import { useBookings } from "../features/bookings/useBookings";
import AddBookings from "../features/bookings/AddBookings";
import { AddBookingsProvider } from "../context/useContextAddBookings";

export default function Bookings() {
  const { isLoading } = useBookings();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <AddBookingsProvider>
      <BookingsTableOperations />
      <Row>
        <BookingTable />
        {/* <AddBookings /> */}
      </Row>
    </AddBookingsProvider>
  );
}
