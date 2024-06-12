import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { Body2, Color, Space } from "ui";

interface IProps {
  offset?: number;
  $isLightMode?: boolean;
}

export const StyledBadge = styled(Body2)<IProps>`
  display: flex;
  gap: 4px;
  padding: ${Space.SMALLEST} ${Space.XXS};
  color: ${Color.White};
  background-color: ${Color.Graphite};
  border-radius: 40px;
`;

export const Container = styled.div<GridProps & IProps>`
  position: sticky;
  top: ${(props) => props.offset && props.offset - 1}px;
  z-index: 1;
  grid-column: 1/3;
  display: flex;
  gap: ${Space.XXS};
  ${grid}
  padding-bottom: ${Space.SMALLEST};
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Black)};
`;

export const Close = styled.button`
  margin-top: 5px;
  padding: 0;
  color: ${Color.White};
  background-color: transparent;
  border: none;
  cursor: pointer;

  :hover {
    color: ${Color.PrimaryLight};
  }

  :active {
    color: ${Color.PrimaryDark};
  }
`;
