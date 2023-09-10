import React from "react";
import Model from "./Model";
import { GrClose } from "react-icons/gr";

export default function CloseButton() {
  return (
    <Model.Close variation="transparent" className="closeBtn">
      <GrClose size={22} />
    </Model.Close>
  );
}
