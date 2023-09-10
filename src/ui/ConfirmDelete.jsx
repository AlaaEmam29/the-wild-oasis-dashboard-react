import React from "react";
import Model from "./Model";
import Heading from "./Heading";
import FormRow from "./FormRow";
import Button from "./Button";
import { styled } from "styled-components";
import CloseButton from "./CloseButton";
import CancelModelButton from "./CancelModelButton";
const Text = styled.p`
  margin-top: 1rem;
`;
const style = {
  width: "55rem",
};
export default function ConfirmDelete({ deleteName, deleteItem, disabled }) {
  return (
    <>
      <CloseButton />
      <Model.Window style={style}>
        <Heading as="h3">Delete {deleteName}</Heading>
        <Text>
          Are you sure you want to delete this {deleteName} permanently? This
          action cannot be undone.
        </Text>
        <FormRow layout="flex">
          <CancelModelButton disabled={disabled} />
          <Button
            variation="danger"
            type="submit"
            onClick={deleteItem}
            disabled={disabled}
          >
            Delete
          </Button>
        </FormRow>
      </Model.Window>
    </>
  );
}
