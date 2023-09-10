import React from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import { useBookingDetails } from "./useBookingDetails";
import { styled } from "styled-components";
const StyleHeading = styled(Heading)`
  font-weight: bold;
  font-style: normal;
`;
const tagType = {
  "checked-in": "green",
  "checked-out": "danger",
  unconfirmed: "silver",
};
const StyleBookingGroup = styled(Row)`
  gap: 2rem;
`;

export default function BookingGroup() {
  const { booking } = useBookingDetails();
  const { id: bookingId, status } = booking;

  return (
    <StyleBookingGroup type="row">
      <StyleHeading as="h1">
        Booking <span>#{bookingId}</span>
      </StyleHeading>
      <Tag type={tagType[status]}>{status.replace("-", " ").toUpperCase()}</Tag>
    </StyleBookingGroup>
  );
}
