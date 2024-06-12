import styled from "styled-components";
import { Color, Space } from "ui";

interface IProps {
  isInFavorites?: boolean;
}

export const Container = styled.div`
  display: flex;
  gap: 2px;
  overflow: hidden;
  border-radius: 10px;
`;

export const ControlButton = styled.button<IProps>`
  padding: ${`${Space.XXS} ${Space.XXL}`};
  color: ${({ isInFavorites }) => (isInFavorites ? Color.PrimaryDark : Color.Light)};
  background-color: ${Color.Graphite};
  border: none;
  cursor: pointer;
  min-width: 240px;

  font-size: 15px;

  :hover {
    color: ${({ isInFavorites }) => (isInFavorites ? Color.PrimaryDark : Color.White)};
  }

  :active {
    background-color: ${Color.Secondary};
  }
`;
