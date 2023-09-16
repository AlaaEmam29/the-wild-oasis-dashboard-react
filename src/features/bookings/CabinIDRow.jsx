import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useContextAddBookings } from "../../context/useContextAddBookings";

export default function CabinIDRow({ cabin }) {
  const { register, control } = useForm();
  const { handleCabinID } = useContextAddBookings();
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            value={cabin.id}
            onChange={handleCabinID}
            
                       
          />
        </td>
        <td>{cabin.id}</td>
        <td>{cabin.name}</td>
        <td>{cabin.maxCapacity}</td>
        <td>{cabin.price}</td>
        <td>{cabin.discount}</td>
      </tr>
    </>
  );
}
