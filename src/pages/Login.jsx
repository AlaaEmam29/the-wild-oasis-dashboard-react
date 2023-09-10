import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { useAuth } from "../features/authentication/useAuth";
const StyledMain = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  place-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function Login() {
  return (
    <StyledMain>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </StyledMain>
  );
}
