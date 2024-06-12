import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Space, Color } from "ui";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

interface IProps {
  $isLightMode?: boolean;
}

export const MenuWrap = styled.div<GridProps>`
  grid-column: 2/3;
  ${grid}
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Space.L};
`;

export const BurgerIcon = styled(GiHamburgerMenu)`
  fill: ${Color.White};
`;

export const CrossIcon = styled(IoCloseSharp)<IProps>`
  fill: ${({ $isLightMode }) => ($isLightMode ? Color.Black : Color.White)};
`;
