import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Color, H3, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const Slider = styled.div<GridProps>`
  display: flex;
  gap: ${Space.L};
  width: 100%;
  ${grid};
`;

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const ItemContainer = styled.div`
  display: flex;
  min-width: 272px;
`;

export const Arrow = styled.button<IProps>`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Secondary : Color.White)};
  cursor: pointer;

  :hover {
    color: ${Color.PrimaryDark};
  }

  :disabled {
    opacity: 0.3;
    cursor: auto;
  }
`;

export const Title = styled(H3)`
  width: 100%;
  text-align: left;
  color: ${Color.White};
`;

export const Header = styled.header`
  display: flex;
`;
