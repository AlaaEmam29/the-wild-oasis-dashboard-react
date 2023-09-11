import React from "react";
import { styled } from "styled-components";
import ActivityItem from "./ActivityItem";
import { useTodayActivity } from "./useTodayActivity";
const StyledActivityList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-grey-100);
  gap: 1rem;
`;
import Empty from "../../ui/Empty";
export default function ActivityList() {
  const { activities } = useTodayActivity();
  console.log(activities , 'activities')
  return (
    <StyledActivityList>
      {activities?.length > 0 ? (
        activities.map((data, i) => {
          const {
            status,
            guests: { name, nationality, countryFlag },
            numberOfNight,
            id: bookingId,
          } = data;
          return (
            <ActivityItem
              key={bookingId}
              name={name}
              status={status}
              nationality={nationality}
              numberOfNight={numberOfNight}
              countryFlag={countryFlag}
              bookingId={bookingId}
            />
          );
        })
      ) : (
        <Empty>No Activity Today</Empty>
      )}
    </StyledActivityList>
  );
}
