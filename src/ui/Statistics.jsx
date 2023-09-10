import React from "react";
import Statistic from "./Statistic";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { USDollar } from "../utils/helper";

export default function Statistics({
  recentBookings,
  ConfirmedStays,
  daysCount,
  cabins,
}) {
  const numOfRecentBookings = recentBookings?.length || "___";
  const numOfConfirmedStays = ConfirmedStays?.length || "___";
  const totalPrice = recentBookings?.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0,
  );
  const cabinsCount = cabins?.length || 0;
  const occupancy = Math.round(
    (ConfirmedStays?.reduce((acc, curr) => acc + curr.numberOfNight, 0) /
      (daysCount * cabinsCount)) *
      100,
  );
  return (
    <>
      <Statistic>
        <Statistic.Icon color="blue" icon={<HiOutlineBriefcase />} />
        <Statistic.Info>
          <h5>booking</h5>
          <p>{numOfRecentBookings}</p>
        </Statistic.Info>
      </Statistic>
      <Statistic>
        <Statistic.Icon color="green" icon={<HiOutlineBanknotes />} />
        <Statistic.Info>
          <h5>sales</h5>
          <p>{USDollar.format(totalPrice)}</p>
        </Statistic.Info>
      </Statistic>
      <Statistic>
        <Statistic.Icon color="yellow" icon={<HiOutlineCalendarDays />} />
        <Statistic.Info>
          <h5>check ins</h5>
          <p>{numOfConfirmedStays}</p>
        </Statistic.Info>
      </Statistic>
      <Statistic>
        <Statistic.Icon color="indigo" icon={<HiOutlineChartBar />} />
        <Statistic.Info>
          <h5>occupancy rate</h5>
          <p>{occupancy}%</p>
        </Statistic.Info>
      </Statistic>
    </>
  );
}
