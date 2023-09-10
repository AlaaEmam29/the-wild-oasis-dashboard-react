import React from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import InputFile from "../../ui/InputFile";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import Model from "../../ui/Model";
import CancelModelButton from "../../ui/CancelModelButton";
import CloseButton from "../../ui/CloseButton";

const requiredField = { required: "This field is required" };
export default function CabinForm({ closeModelEdit, cabinToEdit = {} }) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editID);

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit && editValues,
  });
  const { errors } = formState;
  const isCreatingEditing = isCreating || isUpdating;
  const submitForm = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const cabin = { ...data, image };
    if (isEdit) {
      updateCabin({ newCabinData: cabin, id: editID });

      closeModelEdit();
    } else {
      createCabin(cabin);
      reset();
    }
  };
  const errorForm = (errors) => {
    console.log(errors);
  };
  return (
    <>
      <CloseButton />
      <Model.Window>
        <Form onSubmit={handleSubmit(submitForm, errorForm)} model="true">
          <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              {...register("name", requiredField)}
              disabled={isCreatingEditing}
            />
          </FormRow>
          <FormRow
            label="Maximum capacity"
            error={errors?.maxCapacity?.message}
          >
            <Input
              disabled={isCreatingEditing}
              type="number"
              id="maxCapacity"
              {...register("maxCapacity", {
                ...requiredField,
                min: {
                  value: 1,
                  message: "Capacity must be at least 1",
                },
              })}
            />
          </FormRow>

          <FormRow label="Regular price" error={errors?.price?.message}>
            <Input
              type="number"
              disabled={isCreatingEditing}
              id="price"
              {...register("price", {
                ...requiredField,
                minLength: {
                  value: 3,
                  message: "Price must be at least 3 digits",
                },
              })}
            />
          </FormRow>

          <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
              type="number"
              id="discount"
              disabled={isCreatingEditing}
              defaultValue={0}
              {...register("discount", {
                ...requiredField,
                validate: (value) => {
                  const discountValue = parseFloat(value);
                  const priceValue = parseFloat(getValues().price);

                  if (discountValue > priceValue) {
                    return "Discount should be less than or equal to the price";
                  }
                  return true;
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Description for website"
            error={errors?.description?.message}
          >
            <Textarea
              name="description"
              disabled={isCreatingEditing}
              {...register("description", requiredField)}
            />
          </FormRow>

          <FormRow label="Cabin Photo" error={errors?.image?.message}>
            <InputFile
              id="image"
              accept="image/*"
              disabled={isCreatingEditing}
              {...register("image", {
                required: isEdit ? false : "This field is required",
              })}
              data-text={
                isEdit ? editValues?.image?.split?.("cabin-images/")[1] : ""
              }
            />
          </FormRow>

          <FormRow layout="flex">
            <CancelModelButton onClick={reset} />
            <Button
              variation="primary"
              size="large"
              type="submit"
              disabled={isCreatingEditing}
            >
              {isCreating
                ? "Loading..."
                : isEdit
                ? "Update Cabin"
                : "Create New Cabin"}
            </Button>
          </FormRow>
        </Form>
      </Model.Window>
    </>
  );
}
