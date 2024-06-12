import { hallHero } from "assets";
import styled from "styled-components";
import { SpaceProps, space } from "styled-system";
import { Body2, Space } from "ui";

export const Container = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  min-height: 100vh;
  max-width: 100vw;

  padding: ${Space.LARGEST} ${Space.LARGEST} ${Space.LARGEST};
  ${space}

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 23%),
    url(${hallHero}) no-repeat;

  margin: 0;

  background-size: 100% 100%;
  background-position: 50% 50%;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 23%; 
  left: 25%; 
  width: 50%; 
  height: 47%; 
  box-sizing: border-box; 
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 0px 0px;
`;

export const Footer = styled.footer``;

export const Copyright = styled(Body2)`
  text-align: center;
`;
