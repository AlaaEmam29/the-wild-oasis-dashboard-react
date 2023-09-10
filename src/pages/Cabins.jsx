import React, { useState } from "react";
import Row from "../ui/Row";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CabinForm from "../features/cabins/CabinForm";
import Loader from "../ui/Loader";
import { useCabins } from "../features/cabins/useCabins";
import AddCabin from "../features/cabins/AddCabin";

export default function Cabins() {
  const { isLoading } = useCabins();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <CabinTableOperations />
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}
