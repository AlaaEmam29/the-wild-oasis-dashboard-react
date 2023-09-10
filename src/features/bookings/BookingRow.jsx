import React from "react";
import Menus from "../../ui/Menus";
import { BiDotsVertical } from "react-icons/bi";
import { formatDistanceFromNow } from "../../utils/helper";
import { styled } from "styled-components";
import Tag from "../../ui/Tag";
import { format, isToday, parseISO } from "date-fns";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Model from "../../ui/Model";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";

const TD = styled.td`
  vertical-align: middle;
  text-align: center;
  h5 {
    margin-bottom: 7px;
  }
`;

const TdTag = styled.td`
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.span`
  font-weight: 500;
  display: block;
  text-align: center;
`;
const CabinName = styled.h4`
  font-weight: bold;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
`;
const Email = styled.span`
  color: var(--color-grey-500);
  font-size: 1.2rem;
`;
export default function BookingRow({ booking }) {
  const {
    id: bookingId,
    cabins: { name },
    totalPrice,
    numberOfNight,
    status,
    startDate,
    endDate,
    guests: { name: fullName, email },
  } = booking;
  const tagType = {
    "checked-in": "green",
    "checked-out": "danger",
    unconfirmed: "silver",
  };
  const navigate = useNavigate();
  const goToDetailsBooking = () => {
    navigate(`/bookings/${bookingId}`);
  };
  const goToDetailsChecking = () => {
    navigate(`/checking/${bookingId}`);
  };
  const { isCheckOut, checkOut } = useCheckOut();
  const handleCheckOut = () => {
    checkOut({ bookingId });
  };
  const { isDeleting, deleteBooking } = useDeleteBooking();
  return (
    <Model>
      <tr>
        <TD>
          <CabinName>{name}</CabinName>
        </TD>

        <TD>
          <Name>{fullName}</Name>
          <Email>{email}</Email>
        </TD>
        <TD colSpan={2}>
          <h5>
            {isToday(parseISO(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            &rarr; {numberOfNight} night stay
          </h5>
          <span>
            {format(parseISO(startDate), "MMM dd yyyy")} &mdash;
            {format(parseISO(endDate), "MMM dd yyyy")}
          </span>
        </TD>
        <TdTag>
          <Tag type={tagType[status]}>
            {status.replace("-", " ").toUpperCase()}
          </Tag>
        </TdTag>
        <TD>{totalPrice}</TD>
        <TD>
          <Menus.Menu>
            <Menus.Toggle id={bookingId}>
              <BiDotsVertical />
            </Menus.Toggle>
            <Menus.List id={bookingId}>
              <Menus.Button icon={<HiEye />} onClick={goToDetailsBooking}>
                See Details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={goToDetailsChecking}
                >
                  Check In{" "}
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  disabled={isCheckOut}
                  onClick={handleCheckOut}
                >
                  Check Out{" "}
                </Menus.Button>
              )}

              <Model.Open name="removeBooking">
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  Delete Booking
                </Menus.Button>
              </Model.Open>
            </Menus.List>
            <Model.Container name="removeBooking">
              <ConfirmDelete
                deleteName="Booking"
                deleteItem={() => deleteBooking(bookingId)}
                id={bookingId}
                disabled={isDeleting}
              />
            </Model.Container>
          </Menus.Menu>
        </TD>
      </tr>
    </Model>
  );
}
