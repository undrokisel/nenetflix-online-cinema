import styled from "styled-components";
import { grid, GridProps, layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Color, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const Wrapper = styled.div<LayoutProps & IProps>`
  grid-template-columns: 100%;
  min-height: 100vh;
  max-width: 100vw;
  margin: 0 auto;
  ${layout};
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Black)};
`;

export const Main = styled.main<GridProps>`
  display: grid;
  grid-template-columns: 100%;
  ${grid};
`;

export const Background = styled.div<IProps & SpaceProps>`
  width: 100%;
  height: 100%;
  padding: 0 ${Space.S} ${Space.M};
  ${space};
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Black)};
`;
