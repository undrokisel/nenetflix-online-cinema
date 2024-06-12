import styled from "styled-components";
import { Color } from "ui";

export const StyledGenre = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  margin: 0;
  padding: 0;
  list-style-position: inside;
`;

export const Genre = styled.li`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Color.Secondary};
  :first-child {
    list-style: none;
  }
`;
