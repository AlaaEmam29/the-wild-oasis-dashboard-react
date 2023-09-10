import React, { useState } from "react";
import Button from "../../ui/Button";
import CabinForm from "./CabinForm";
import Model from "../../ui/Model";

export default function AddCabin() {
  return (
    <Model>
      <Model.Open name="openForm">
        <Button>Add Cabin</Button>
      </Model.Open>
      <Model.Container name="openForm">
        <CabinForm />
      </Model.Container>
    </Model>
  );
}
