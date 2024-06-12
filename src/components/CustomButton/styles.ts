import styled from "styled-components";
import { Color, Space } from "ui";


export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${Space.S};

  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  
  color: ${Color.White};
  text-decoration: none;

  background-color: inherit;
  outline: none;
  border: none;
  padding: 0;


  :hover {
    color: ${Color.PrimaryLight};
  }
`;
