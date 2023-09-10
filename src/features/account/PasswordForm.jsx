import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import AccountForm from "./AccountForm";
import { useUpdateUser } from "../authentication/useUpdateUser";

const requiredField = { required: "This field is required" };

export default function PasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isUpdating, updateUser } = useUpdateUser();
  const submitForm = (data) => {
    const { password } = data;
    updateUser({ password }, { onSettled: () => reset() });
  };
  const errorForm = (error) => {
    console.log(error);
  };
  return (
    <AccountForm>
      <Form onSubmit={handleSubmit(submitForm, errorForm)}>
        <FormRow
          label="New password (min 8 chars)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            {...register("password", {
              ...requiredField,
              minLength: {
                value: 8,
                message: "Password length should be at least 8 characters",
              },
              maxLength: {
                value: 14,
                message: "Password cannot exceed more than 14 characters",
              },
            })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow label="Confirm password" error={errors?.rePassword?.message}>
          <Input
            type="password"
            id="rePassword"
            {...register("rePassword", {
              ...requiredField,
              validate: (val) =>
                val === getValues().password || "Passwords do not match",
            })}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow layout="flex">
          <Button
            variation="secondary"
            onClick={reset}
            type="reset"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button variation="primary" size="large" type="submit">
            {isUpdating ? <Spinner color="white" /> : "Update Password"}
          </Button>
        </FormRow>
      </Form>
    </AccountForm>
  );
}
