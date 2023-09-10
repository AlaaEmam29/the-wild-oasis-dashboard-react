import React from "react";
import AccountTableOperations from "../features/account/AccountTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DataForm from "../features/account/DataForm";
import styled from "styled-components";
import PasswordForm from "../features/account/PasswordForm";
import { useAuth } from "../features/authentication/useAuth";
import Loader from "../ui/Loader";
const AccountSection = styled(Row)`
  gap: 2.4rem;
`;
export default function Account() {
  const { isLoading } = useAuth();
  if (isLoading) return <Loader />;
  return (
    <AccountSection>
      <AccountTableOperations name="Update your account" as="h1" />
      <Row>
        <Heading as="h5">Update user data</Heading>
        <DataForm />
      </Row>
      <Row>
        <Heading as="h5">Update password</Heading>
        <PasswordForm />
      </Row>
    </AccountSection>
  );
}
