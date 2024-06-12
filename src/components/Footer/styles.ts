import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Body2, Color, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const StyledFooter = styled.footer<GridProps>`
  display: flex;
  place-items: center;
  ${grid};
`;

export const LoadMore = styled.button<IProps>`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  padding: ${Space.SMALLEST} ${Space.S};
  width: 161px;
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.Light : Color.Graphite)};
  border: none;
  border-radius: 40px;
  cursor: pointer;
`;

export const Text = styled(Body2)`
  color: ${Color.White};
`;
