import React from "react";
import { IoIosLogOut } from "react-icons/io";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";
export default function Logout() {
  const { isLogout, userLogout } = useLogout();
  return (
    <>
      <ButtonIcon onClick={() => userLogout()}>
        {isLogout ? <Spinner color="#4f46e5" /> : <IoIosLogOut />}
      </ButtonIcon>
    </>
  );
}
