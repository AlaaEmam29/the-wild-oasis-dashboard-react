import React from "react";
import Row from "../ui/Row";
import UserHeader from "../features/user/UserHeader";
import UserForm from "../features/user/UserForm";

export default function User() {
  return (
    <>
      <UserHeader />
      <Row>
        <UserForm />
      </Row>
    </>
  );
}
