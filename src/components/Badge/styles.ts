import styled from "styled-components";

export const StyledBadge = styled.div`
  background: rgb(123, 97, 255);
  padding: 10px;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  
  width: 10px;
  height: 10px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  :hover::after {
    transform: scale(1.2);
  }
`;
