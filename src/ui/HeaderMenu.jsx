import React from "react";
import ButtonIcon from "./ButtonIcon";
import { BiUser } from "react-icons/bi";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Row from "./Row";
import DarkModeToggle from "./DarkModeToggle";
const StyleHeaderMenu = styled(Row)`
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  const goToAccountPage = () => {
    navigate("/account");
  };
  return (
    <StyleHeaderMenu type="row">
      <ButtonIcon>
        <BiUser onClick={goToAccountPage} />
      </ButtonIcon>
      <DarkModeToggle />
      <Logout />
    </StyleHeaderMenu>
  );
}
