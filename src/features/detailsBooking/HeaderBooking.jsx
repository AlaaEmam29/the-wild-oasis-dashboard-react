import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { styled } from "styled-components";
import { useBookingDetails } from "./useBookingDetails";
import Tag from "../../ui/Tag";
import ButtonLink from "../../ui/ButtonLink";
import { useNavigate } from "react-router-dom";
import BookingDataContainer from "./BookingDataContainer";
import BookingGroup from "./BookingGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
export default function HeaderBooking() {
  const moveBack = useMoveBack();

  return (
    <Row type="row">
      <BookingGroup />
      <ButtonLink icon={<BsArrowLeft />} onClick={moveBack}>
        Back{" "}
      </ButtonLink>
    </Row>
  );
}
