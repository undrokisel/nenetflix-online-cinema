import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Space } from "ui";

export const StyledMovieList = styled.div<GridProps>`
  display: grid;
  place-items: center;
  grid-gap: ${Space.L};
  ${grid}
`;
