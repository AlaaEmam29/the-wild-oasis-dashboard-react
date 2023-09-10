import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { styled } from "styled-components";
import Avatar from "./Avatar";
import avatarImg from "/public/default-user.jpg";
import HeaderMenu from "./HeaderMenu";
import { useAuth } from "../features/authentication/useAuth";
const LayoutStyle = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  const { fullName, avatar } = user.user_metadata;
  return (
    <LayoutStyle>
      <Header direction="end">
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          <>
            <Avatar src={avatar || avatarImg} alt="avatar" user={fullName} />
            <HeaderMenu />
          </>
        )}
      </Header>
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </LayoutStyle>
  );
}
