import React from "react";
import { styled } from "styled-components";
import { USDollar } from "../../utils/helper";
import { useDeleteCabin } from "./useDeleteCabin";
import { useState } from "react";
import CabinForm from "./CabinForm";
import { BsFillPencilFill } from "react-icons/bs";
import {
  BiDotsVertical,
  BiSolidTrashAlt,
  BiSolidDuplicate,
} from "react-icons/bi";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Model from "../../ui/Model";
const StyledTr = styled.tr`
  td:first-child {
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }
  span {
    font-family: Sono;
    font-size: 1.6rem;
  }
  .bold {
    font-weight: 600;
  }
`;
const Img = styled.img`
  display: block;
  object-fit: cover;
  width: 10rem;
  border-radius: 7px;
  object-position: center center;
  height: 7rem;
`;
const Price = styled.span`
  font-weight: 500;

  color: var(--color-grey-600);
`;
const Discount = styled.span`
  color: var(--color-green-700);
  font-weight: 600;
`;
export default function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id: cabinId, ...cabinValues } = cabin;
  const { image, maxCapacity, discount, price, description, name } =
    cabinValues;

  return (
    <Model>
      <StyledTr>
        <td>
          <Img src={image} alt={name} />
          <span className="bold">{name}</span>
        </td>
        <td>
          <span>Fits up to {maxCapacity} guests</span>
        </td>
        <td>
          <Price className="bold">{USDollar.format(price)}</Price>
        </td>
        <td>
          <Discount>{discount ? USDollar.format(discount) : `___`}</Discount>
        </td>
        <td className="menus">
          <Menus.Menu>
            <Menus.Toggle id={cabinId}>
              <BiDotsVertical />
            </Menus.Toggle>
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<BiSolidDuplicate />}
                onClick={() =>
                  createCabin({ ...cabinValues, name: `copy of ${name}` })
                }
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>
              <Model.Open name="editForm">
                <Menus.Button icon={<BsFillPencilFill />}>Edit</Menus.Button>
              </Model.Open>
              <Model.Open name="confirmDelete">
                <Menus.Button icon={<BiSolidTrashAlt />} disabled={isDeleting}>
                  Delete
                </Menus.Button>
              </Model.Open>
            </Menus.List>
            <Model.Container name="editForm">
              <CabinForm
                cabinToEdit={cabin}
                closeModelEdit={() => setIsEdit(false)}
              />
            </Model.Container>

            <Model.Container name="confirmDelete">
              <ConfirmDelete
                deleteName="Cabin"
                deleteItem={() => deleteCabin(cabinId)}
                id={cabinId}
                disabled={isDeleting}
              />
            </Model.Container>
          </Menus.Menu>
        </td>
      </StyledTr>
    </Model>
  );
}
