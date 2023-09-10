import React from "react";
import Form from "../../ui/Form";
import FormCol from "../../ui/FormCol";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuthLogin } from "./useAuthLogin";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Spinner from "../../ui/Spinner";
const StyledForm = styled(Form)`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;
const requiredField = { required: "This field is required" };

export default function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isLoading, userLogin } = useAuthLogin();
  const { errors } = formState;

  const submitForm = (data) => {
    const { password, email } = data;
    userLogin({ password, email });
  };
  const errorForm = (error) => {
    console.log(error);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitForm, errorForm)}>
      <FormCol label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          defaultValue="test@test.com"
          autoComplete="username"
          {...register("email", {
            ...requiredField,
          })}
          disabled={isLoading}
        />
      </FormCol>
      <FormCol label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          defaultValue="1234"
          autoComplete="current-password"
          {...register("password", {
            ...requiredField,
          })}
          disabled={isLoading}
        />
      </FormCol>
      <Button>{isLoading ? <Spinner color="white" /> : "Login"}</Button>
    </StyledForm>
  );
}
