import React from "react";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "../guests/useGuests";
import Loader from "../../ui/Loader";

export default function GuestIDTable() {
  const {isLoading , guests} = useGuests();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h3>Guests</h3>
      <Table >
        <Table.Header>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>NationalID</th>
            <th>Nationality</th>
            <th>CountryFlag</th>
          </tr>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => {
            return <GuestRow key={guest.id} guest={guest} />;
          }}
        />

        {/* 
        {count > PAGINATIONLENGTH && (
          <Table.Footer>
            <PAGINATIONLENGTH count={count} />
          </Table.Footer>
        )} */}
      </Table>
    </>
  );
}
