import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { styled } from "styled-components";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { signUp } from "../../services/apiAuth";
import { useCreateUser } from "../authentication/useCreateUser";
import Spinner from "../../ui/Spinner";
const StyledContainer = styled.div`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
`;
const requiredField = { required: "This field is required" };

export default function UserForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { isLoading, createUser } = useCreateUser();
  const { errors } = formState;
  const submitForm = (data) => {
    const { email, password, fullName } = data;
    createUser({ password, email, fullName });
    reset();
  };
  const errorForm = (error) => {
    console.log(error);
  };

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit(submitForm, errorForm)}>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register("fullName", {
              ...requiredField,
            })}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register("email", {
              ...requiredField,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message:
                  "Please enter a valid email address (e.g., yourname@example.com)",
              },
            })}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow
          label="Password (min 8 characters)"
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
            disabled={isLoading}
          />
        </FormRow>
        <FormRow label="Repeat password" error={errors?.rePassword?.message}>
          <Input
            type="password"
            id="rePassword"
            {...register("rePassword", {
              ...requiredField,
              validate: (val) =>
                val === getValues().password || "Passwords do not match",
            })}
            disabled={isLoading}
          />
        </FormRow>
        <FormRow layout="flex">
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button
            variation="primary"
            size="large"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="white" /> : "Create New User"}
          </Button>
        </FormRow>
      </Form>
    </StyledContainer>
  );
}
