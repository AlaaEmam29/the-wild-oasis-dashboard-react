import React from "react";
import Table from "../../ui/Table";
import CabinIDRow from "./CabinIDRow";
import { useCabins } from "../cabins/useCabins";
import Loader from "../../ui/Loader";

export default function CabinIDTable() {
  const {isLoading,  cabins, count } = useCabins();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h3>Cabins</h3>
      <Table>
        <Table.Header>
          <tr>
            <th></th>

            <th>ID</th>
            <th>cabin</th>
            <th>capacity</th>
            <th>price</th>
            <th>discount</th>
          </tr>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => {
            return <CabinIDRow key={cabin.id} cabin={cabin} />;
          }}
        />

        {/* <Table.Body
          data={bookings}
          render={(booking) => {
            return <BookingRow key={booking.id} booking={booking} />;
          }}
        />
        {count > PAGINATIONLENGTH && (
          <Table.Footer>
            <PAGINATIONLENGTH count={count} />
          </Table.Footer>
        )} */}
      </Table>
    </>
  );
}
