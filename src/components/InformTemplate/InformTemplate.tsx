import { Outlet, useLocation } from "react-router-dom";
import { Container, Footer, Copyright, Overlay } from "./styles";
import { Space } from "ui";
import { ROUTE } from "router";
import { Trends } from "pages";
import { Header } from "components/Header";
import { NavBar } from "components/NavBar";
import { useWindowSize } from "../../hooks/index";
import { useState } from "react";

export const InformTemplate = () => {
  const location = useLocation();

  const { screenWidth } = useWindowSize();
  const [offset] = useState<number>(0);


  return (
    <>
      <Container
        padding={{
          S: `${Space.L} ${Space.L} ${Space.XXL}`,
          XXL: `${Space.L} ${Space.LARGEST}`,
        }}
      >
        <Header />
        {screenWidth > 1439 && <NavBar offset={offset} />}
        <Overlay id="overlay">
          <Outlet />
        </Overlay>
      </Container>
      {location.pathname.slice(1) === ROUTE.ABOUT_US && <Trends />}
      <Footer>
        <Copyright>© Made by Kisel A.V. Onix</Copyright>
      </Footer>
    </>
  );
};
