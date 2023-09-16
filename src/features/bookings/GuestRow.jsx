import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useContextAddBookings } from "../../context/useContextAddBookings";
import Flag from "../../ui/Flag";

export default function GuestRow({ guest }) {
  const { register, control } = useForm();
  const { handleGuestID } = useContextAddBookings();

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            value={guest.id}
            onChange={handleGuestID}
          
          />
        </td>
        <td>{guest.id}</td>
        <td>{guest.name}</td>
        <td>
          <a href={guest.email}>{guest.email}</a>
        </td>
        <td>{guest.phone}</td>
        <td>{guest.nationalID}</td>
        <td>{guest.nationality}</td>
        <td>
        <Flag alt={guest.nationality} src={guest.countryFlag} />
        </td>
      </tr>
    </>
  );
}
