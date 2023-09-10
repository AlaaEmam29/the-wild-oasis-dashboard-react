import React from "react";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { PAGINATIONLENGTH } from "../../utils/constants";

export default function CabinTable() {
  const { cabins, count } = useCabins();
  const lastThStyle = {
    width: "10rem",
  };

  return (
    <Menus>
      <Table>
        <Table.Header>
          <tr>
            <th>cabin</th>
            <th>capacity</th>
            <th>price</th>
            <th>discount</th>
            <th style={lastThStyle}></th>
          </tr>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => {
            return <CabinRow key={cabin.id} cabin={cabin} />;
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
