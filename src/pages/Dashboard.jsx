import React from "react";
import DashboardTableOperations from "../features/dashboard/DashboardTableOperations";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Statistics from "../ui/Statistics";
import { useBookings } from "../features/bookings/useBookings";
import Loader from "../ui/Loader";
import Donut2D from "../ui/Donut2D";
import LineChart from "../ui/LineChart";
import GridChart from "../features/activity/ActivityToday";
import { useBookingsAfterDate } from "../features/dashboard/useBookingsAfterDate";
import { useStaysAfterDate } from "../features/dashboard/useStaysAfterDate";
import { useCabins } from "../features/cabins/useCabins";
import { useTodayActivity } from "../features/activity/useTodayActivity";
export default function Dashboard() {
  const { recentBookings, isRecentLoading } = useBookingsAfterDate();
  const { isStaysLoading, ConfirmedStays, daysCount } = useStaysAfterDate();
  const { cabins, isLoading } = useCabins();
  const { isTodayActivityLoading } = useTodayActivity();
  const isLoadingStatus =
    isRecentLoading || isStaysLoading || isLoading || isTodayActivityLoading;
  if (isLoadingStatus) {
    return <Loader />;
  }

  return (
    <>
      <DashboardTableOperations />
      <DashboardLayout>
        <Statistics
          recentBookings={recentBookings}
          ConfirmedStays={ConfirmedStays}
          daysCount={daysCount}
          cabins={cabins}
        />
        <GridChart />
        <Donut2D />
        <LineChart />
      </DashboardLayout>
    </>
  );
}
