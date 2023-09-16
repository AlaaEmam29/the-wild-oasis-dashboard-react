import React, { useState } from "react";
import Button from "../../ui/Button";
import Model from "../../ui/Model";
import MultiStepBookingForm from "./MultiStepBookingForm";

export default function AddBookings() {
  return (
    <Model>
      <Model.Open name="openForm">
        <Button>Add Booking</Button>
      </Model.Open>
      <Model.Container name="openForm">
        <MultiStepBookingForm />
      </Model.Container>
    </Model>
  );
}
