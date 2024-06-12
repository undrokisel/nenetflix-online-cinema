import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { BsFilterRight } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Color } from "ui";

interface IProps {
  $isLightMode?: boolean;
}

export const MenuWrap = styled.div<GridProps>`
  grid-column: 2/3;
  ${grid}
`;

export const FilterIcon = styled(BsFilterRight)`
  fill: ${Color.White};

  :hover {
    fill: ${Color.PrimaryDark};
  }
`;

export const CrossIcon = styled(IoCloseSharp)<IProps>`
  fill: ${({ $isLightMode }) => ($isLightMode ? Color.Black : Color.White)};
`;
