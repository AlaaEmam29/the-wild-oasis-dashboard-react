import React, { useEffect, useState } from "react";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";
import { PAGINATIONLENGTH } from "../../utils/constants";

export default function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  if (isLoading) return <p>Loading...</p>;

  return (
    <Menus>
      <Table>
        <Table.Header>
          <tr>
            <th>cabin</th>
            <th>guest</th>
            <th colSpan={2}>dates</th>
            <th>status</th>
            <th>amount</th>

            <th></th>
          </tr>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => {
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
        {count > PAGINATIONLENGTH && (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        )}
      </Table>
    </Menus>
  );
}
