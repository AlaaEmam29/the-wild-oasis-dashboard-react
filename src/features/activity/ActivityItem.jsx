import React from "react";
import { styled } from "styled-components";
import Flag from "../../ui/Flag";
import Guest from "../../ui/Guest";
import Button from "../../ui/Button";
import Status from "../../ui/Status";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useNavigate } from "react-router-dom";

const StyledActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
export default function ActivityItem({
  nationality,
  countryFlag,
  name,
  status,
  numberOfNight,
  bookingId,
}) {
  const navigate = useNavigate();

  const goToDetailsChecking = () => {
    navigate(`/checking/${bookingId}`);
  };
  const { isCheckOut, checkOut } = useCheckOut();
  const handleCheckOut = () => {
    checkOut({ bookingId });
  };
  return (
    <StyledActivityItem>
      {status === "checked-in" ? (
        <Status color="green"> arriving</Status>
      ) : (
        <Status color="blue"> departing</Status>
      )}

      <Flag alt={nationality} src={countryFlag} />
      <Guest>{name}</Guest>
      <p>{numberOfNight} nights</p>

      {status === "checked-in" ? (
        <Button size="small" onClick={goToDetailsChecking}>
          Check In
        </Button>
      ) : (
        <Button size="small" onClick={handleCheckOut} disabled={isCheckOut}>
          Check Out
        </Button>
      )}
    </StyledActivityItem>
  );
}
