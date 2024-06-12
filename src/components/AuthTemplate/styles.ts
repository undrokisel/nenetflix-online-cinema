import styled from "styled-components";
import { flexbox, FlexboxProps, space, SpaceProps } from "styled-system";
import { background } from "assets";
import { Body2, Space } from "ui";

export const Container = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-width: 100vw;
  padding: ${Space.M} ${Space.S} ${Space.XL};
  ${space}
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 23.56%
    ),
    url(${background}) no-repeat;
  background-size: cover;
  margin: 0;
`;

export const Header = styled.header<FlexboxProps>`
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  ${flexbox}
`;

export const Footer = styled.footer``;

export const Copyright = styled(Body2)`
  text-align: center;
`;
