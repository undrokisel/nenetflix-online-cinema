/* eslint-disable indent */
import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Color, Input } from "ui";

interface IProps {
  $isLightMode: boolean;
  $isError: boolean;
}

export const StyledSearchBar = styled.div<GridProps>`
  grid-column: 1/3;
  ${grid}
  display: flex;
  width: 100%;
  background-color: ${Color.Dark};
  border: 1px solid ${Color.Black};
  border-radius: 10px;
`;

export const StyledInput = styled(Input)<IProps>`
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border: 1px solid
    ${({ $isLightMode, $isError }) =>
      $isError ? Color.Error : $isLightMode ? Color.White : Color.Dark};

  :focus {
    color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
    border: 1px solid
      ${({ $isLightMode, $isError }) =>
        $isError ? Color.Error : $isLightMode ? Color.White : Color.Dark};
  }
`;
