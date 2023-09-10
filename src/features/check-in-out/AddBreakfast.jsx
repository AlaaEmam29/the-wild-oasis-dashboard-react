import React from "react";
import Checkbox from "../../ui/Checkbox";
import { useBookingDetails } from "../detailsBooking/useBookingDetails";
import { USDollar } from "../../utils/helper";
import { useCheckIn } from "./useCheckIn";
import { useContextCheck } from "../../context/useContextCheck";
import { useSettings } from "../settings/useSettings";
import Loader from "../../ui/Loader";

export default function AddBreakfast({ breakfast }) {
  const { booking } = useBookingDetails();
  const { isCheckIn, checkIn } = useCheckIn();

  const { addBreakFast, handleAddBreakfast } = useContextCheck();
  return (
    <Checkbox
      id="breackfast"
      checked={addBreakFast}
      onChange={handleAddBreakfast}
      disabled={addBreakFast || isCheckIn}
    >
      Want to add breakfast for {USDollar.format(breakfast)} ?
    </Checkbox>
  );
}
