import React, { useState } from "react";
import Button from "../../ui/Button";
import Model from "../../ui/Model";
import BookingForm from "./BookingForm";

export default function AddBookings() {
  return (
    <Model>
      <Model.Open name="openForm">
        <Button>Add Booking</Button>
      </Model.Open>
      <Model.Container name="openForm">
        <BookingForm />
      </Model.Container>
    </Model>
  );
}
