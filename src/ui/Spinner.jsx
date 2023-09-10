import React from "react";
import { ClipLoader } from "react-spinners";

export default function Spinner({ color }) {
  return <ClipLoader color={color} size={18} />;
}
