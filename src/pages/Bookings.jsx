import React, { useState } from "react";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import Loader from "../ui/Loader";
import { useBookings } from "../features/bookings/useBookings";
import Button from "../ui/Button";
import BookingForm from "../features/bookings/BookingForm";
import AddBookings from "../features/bookings/AddBookings";

export default function Bookings() {
  const { isLoading } = useBookings();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <BookingsTableOperations />
      <Row>
        <BookingTable />
        {/* <AddBookings /> */}
      </Row>
    </>
  );
}
