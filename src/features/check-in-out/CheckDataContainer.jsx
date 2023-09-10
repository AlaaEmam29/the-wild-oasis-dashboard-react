import React, { createContext, useContext, useEffect, useState } from "react";
import BookingDataContainer from "../detailsBooking/BookingDataContainer";
import ConfirmCheckIn from "./ConfirmCheckIn";
import AddBreakfast from "./AddBreakfast";
import Row from "../../ui/Row";
import CheckButtons from "./CheckButtons";
import { useBookingDetails } from "../detailsBooking/useBookingDetails";
import { useContextCheck } from "../../context/useContextCheck";
import { useSettings } from "../settings/useSettings";
export default function CheckDataContainer() {
  const { booking } = useBookingDetails();
  const { isPaid, hasBreakfast, numberOfGuest, numberOfNight } = booking;
  const { setConfirmPaid, setAddBreakfast } = useContextCheck();
  const { isLoading, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(isPaid);
  }, [isPaid]);
  const breakfast = settings?.breakfastPrice * numberOfGuest * numberOfNight;

  useEffect(() => {
    setAddBreakfast(hasBreakfast);
  }, [hasBreakfast]);
  return (
    <>
      <Row>
        <BookingDataContainer />
        {hasBreakfast && <AddBreakfast breakfast={breakfast} />}
        <ConfirmCheckIn breakfast={breakfast} />
        <CheckButtons breakfast={breakfast} />
      </Row>
    </>
  );
}
