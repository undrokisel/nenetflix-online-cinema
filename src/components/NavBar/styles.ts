import styled from "styled-components";
import { Space } from "ui";

interface IProps {
  offset: number;
}

export const StyledNavBar = styled.nav`
  grid-row: 1/3;
  display: flex;
  flex-direction: column;
  gap: ${Space.XXL};
`;

export const Navigation = styled.div<IProps>`
  position: sticky;
  top: ${(props) => props.offset}px;
  display: flex;
  flex-direction: column;
  gap: ${Space.L};
`;
