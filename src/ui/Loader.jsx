import React from "react";
import { BarLoader } from "react-spinners";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
export default function Loader() {
  return (
    <BarLoader color="#4f46e5" height={7} width={200} cssOverride={style} />
  );
}
