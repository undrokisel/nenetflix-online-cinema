import styled from "styled-components";
import { Color } from "ui";

export const StyledBadge = styled.button`
  padding: 4px 10px;
  color: ${Color.PrimaryDark};
  background-color: ${Color.Graphite};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    color: ${Color.PrimaryLight};
  }
`;
