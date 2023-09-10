import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { styled } from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import InputFile from "../../ui/InputFile";
import AccountForm from "./AccountForm";
import { useUpdateUser } from "../authentication/useUpdateUser";
import { useAuth } from "../authentication/useAuth";

const requiredField = { required: "This field is required" };

export default function DataForm() {
  const { user } = useAuth();
  const {
    user_metadata: { avatar, fullName },
    email,
  } = user;

  const { register, handleSubmit, formState, setValue, reset } = useForm();
  const { errors } = formState;
  const { isUpdating, updateUser } = useUpdateUser();
  const submitForm = (data) => {
    const { fullName, email } = data;
    const avatar = data?.avatar?.[0];
    updateUser(
      { fullName, avatar },
      {
        onSettled: () => {
          reset();
          setValue("fullName", fullName);
        },
      },
    );
  };
  const errorForm = (error) => {
    console.log(error);
  };
  const handleCancel = () => {
    reset();
    setValue("fullName", fullName);
  };

  return (
    <AccountForm>
      <Form onSubmit={handleSubmit(submitForm, errorForm)}>
        <FormRow label="Email address" error={errors?.email?.message}>
          <Input type="email" id="email" value={email} disabled />
        </FormRow>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register("fullName", {
              ...requiredField,
            })}
            defaultValue={fullName}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="Avatar image" error={errors?.password?.message}>
          <InputFile
            id="avatar"
            {...register("avatar")}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow layout="flex">
          <Button
            variation="secondary"
            type="reset"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variation="primary"
            size="large"
            type="submit"
            disabled={isUpdating}
          >
            {isUpdating ? <Spinner color="white" /> : "Update Account"}
          </Button>
        </FormRow>
      </Form>
    </AccountForm>
  );
}
