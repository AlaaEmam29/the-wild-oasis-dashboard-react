import React, { useEffect, useState } from "react";
import HeaderBooking from "../features/detailsBooking/HeaderBooking";
import { useBookingDetails } from "../features/detailsBooking/useBookingDetails";
import Loader from "../ui/Loader";
import CheckDataContainer from "../features/check-in-out/CheckDataContainer";
import CheckButtons from "../features/check-in-out/CheckButtons";
import Row from "../ui/Row";
import { CheckInOutProvider } from "../context/useContextCheck";
import { useSettings } from "../features/settings/useSettings";

export default function CheckInOut() {
  const { isLoading, booking } = useBookingDetails();

  const { isLoading: isLoadingSetting, settings } = useSettings();

  if (isLoading || isLoadingSetting) {
    return <Loader />;
  }

  return (
    <CheckInOutProvider>
      <HeaderBooking />
      <Row>
        <CheckDataContainer />
      </Row>
    </CheckInOutProvider>
  );
}
