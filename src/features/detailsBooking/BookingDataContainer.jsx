import React from "react";
import { useBookingDetails } from "./useBookingDetails";
import Header from "../../ui/Header";
import { css, styled } from "styled-components";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import Heading from "../../ui/Heading";
import { format, isToday, parseISO } from "date-fns";
import { USDollar, formatDistanceFromNow } from "../../utils/helper";
import Guest from "../../ui/Guest";
import Item from "../../ui/Item";
import { useSettings } from "../settings/useSettings";
import Flag from "../../ui/Flag";
import { code } from "country-emoji";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: auto;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  svg {
    height: 3rem;
    width: 3rem;
  }

  h3 {
    font-style: normal;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem 4rem 1.2rem;
`;
const StyledGuest = styled(Guest)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  p:first-child {
    font-weight: 500;
    font-size: 1.8rem;
  }
  p:not(:first-child),
  span {
    color: var(--color-grey-500);
    font-size: 1.6rem;
  }
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
  svg {
    color: var(--color-yellow-700);
  }
  ${(props) =>
    props.isPaid &&
    css`
      background-color: var(--color-green-100);
      color: var(--color-green-700);
      svg {
        color: var(--color-green-700);
      }
    `}
  div {
    gap: 0.6rem;
  }
  p {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;
export default function BookingDataContainer() {
  const { booking } = useBookingDetails();
  const {
    cabins: { name: cabinName },
    endDate,
    startDate,
    cabinPrice,
    fees,
    guests: { name: fullName, email, nationalID, countryFlag },
    hasBreakfast,
    isPaid,
    numberOfGuest,
    numberOfNight,
    observation,
    created_at,
    totalPrice,
  } = booking;

  const formattedStartDate = format(parseISO(startDate), "iii, dd LLL y");
  const formattedEndDate = format(parseISO(endDate), "iii, dd LLL y");
  const isStartDateToday = isToday(parseISO(startDate));
  const distanceFromNow = formatDistanceFromNow(startDate);
  const { settings } = useSettings();
  const breakfast = settings?.breakfastPrice * numberOfGuest * numberOfNight;
  const StyledFlag = styled(Flag)`
    max-width: 2.8rem;
  `;
  return (
    <StyledBookingDataBox>
      <Header type="secondary">
        <StyledRow>
          <HiOutlineHomeModern />
          <Heading as="h3">
            {numberOfNight} nights in Cabin {cabinName}
          </Heading>
        </StyledRow>
        <p>
          {formattedStartDate}
          <span>
            &nbsp; ({isStartDateToday ? "Today" : distanceFromNow}) &nbsp;
          </span>
          <span> &mdash; </span>
          &nbsp;
          {formattedEndDate}
        </p>
      </Header>
      <Section>
        <StyledGuest>
          <StyledFlag src={countryFlag} alt={countryFlag} />

          <p>
            {fullName}{" "}
            {numberOfGuest > 1 ? `+ ${numberOfGuest - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>Email : {email}</p>
          <span>&bull;</span>
          <p>National ID : {nationalID}</p>
        </StyledGuest>
        {observation && (
          <Item
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="observations"
          >
            {observation}
          </Item>
        )}

        <Item icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </Item>
        <Price isPaid={isPaid}>
          <Item icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {!hasBreakfast
              ? USDollar.format(totalPrice)
              : USDollar.format(totalPrice + breakfast)}
            <span>
              {hasBreakfast &&
                `${USDollar.format(cabinPrice)} cabin + ${USDollar.format(
                  breakfast,
                )} breakfast`}
            </span>
          </Item>
          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>
      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}
