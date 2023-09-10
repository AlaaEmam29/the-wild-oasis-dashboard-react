import React, { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useBookingDetails } from "../detailsBooking/useBookingDetails";
import { USDollar } from "../../utils/helper";
import { useCheckIn } from "./useCheckIn";
import { useContextCheck } from "../../context/useContextCheck";

export default function ConfirmCheckIn({ breakfast }) {
  const { booking } = useBookingDetails();

  const {
    cabinPrice,
    fees,
    guests: { name: fullName, email },
    totalPrice,
    hasBreakfast,
  } = booking;
  const { isCheckIn } = useCheckIn();
  const { confirmPaid, handleConfirmPaid } = useContextCheck();

  return (
    <Checkbox
      id="confirmPay"
      checked={confirmPaid}
      onChange={handleConfirmPaid}
      disabled={confirmPaid || isCheckIn}
    >
      I confirm that {fullName} has paid the total amount of{" "}
      {!hasBreakfast
        ? USDollar.format(totalPrice)
        : `
            ${USDollar.format(totalPrice + breakfast)} (${USDollar.format(
              totalPrice,
            )} + ${USDollar.format(breakfast)} breakfast)
         `}
    </Checkbox>
  );
}
