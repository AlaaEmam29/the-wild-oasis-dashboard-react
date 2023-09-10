import React from "react";
import { styled } from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ActivityList from "./ActivityList";
const StyleActivityToday = styled(Row)`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem 3.2rem;
  grid-column: 1 / span 2;

  height: 40rem;
  overflow: auto;
  h1 {
    margin-left: 1.2rem;
  }
`;
export default function ActivityToday() {
  return (
    <StyleActivityToday>
      <Heading as="h1">Today </Heading>
      <ActivityList />
    </StyleActivityToday>
  );
}
