import { Outlet } from "react-router-dom";
import { Container, Copyright, Footer, Header } from "./styles";
import { Space } from "ui";
import { CustomLink } from "components";
import { ROUTE } from "router";
import { StyledLogo } from "components/Header/styles";

export const AuthTemplate = () => {
  return (
    <Container
      padding={{
        S: `${Space.L} ${Space.L} ${Space.XXL}`,
        XXL: `${Space.L} ${Space.LARGEST}`,
      }}
    >
      <Header justifyContent={{ S: "center" }}>
        <CustomLink text={""} to={ROUTE.HOME}>
          <StyledLogo/>
        </CustomLink>
      </Header>
      <Outlet />
      <Footer>
        <Copyright>© Made by Kisel A.V. Onix</Copyright>
      </Footer>
    </Container>
  );
};
