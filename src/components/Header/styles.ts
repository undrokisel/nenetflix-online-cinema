import styled from "styled-components";
import { FlexProps, grid, GridProps, space, SpaceProps } from "styled-system";
import { Color, Space } from "ui";
import { Logo, LogoLight } from "assets";

interface IProps {
  $isLightMode: boolean;
  $withoutSearchPage?: boolean;
}

export const StyledHeader = styled.header<GridProps & SpaceProps & IProps & FlexProps>`
  position: "sticky";
  top: -1px;
  z-index: 10;

  display: ${({ $withoutSearchPage }) => (!$withoutSearchPage ? "grid" : "flex")};
  justify-content: ${({ $withoutSearchPage }) => (!$withoutSearchPage ? "" : "space-between")};

  grid-template-columns: ${({ $withoutSearchPage }) =>
    !$withoutSearchPage ? "3fr 1fr" : "1fr 1fr"};

  grid-gap: ${Space.L} ${Space.LARGEST};
  align-items: center;
  justify-items: space-between;
  ${grid};
  width: 100%;
  padding: ${Space.M} 0;
  ${space}

  background-color: ${({ $isLightMode, $withoutSearchPage }) =>
    $withoutSearchPage ? "none" : $isLightMode ? Color.White : Color.Black};
`;

export const StyledLogo = styled(Logo)`
  justify-self: start;
  width: 200px;
  height: 50px;
`;

export const StyledLightLogo = styled(LogoLight)`
  justify-self: start;
`;
