import styled from "styled-components";
import { Color } from "./colors";

export const ButtonPrimary = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${Color.White};
  background-color: ${Color.PrimaryDark};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: ${Color.PrimaryLight};
  }

  :active {
    box-shadow: inset 5px 5px 5px ${Color.Black};
  }
`;

export const ButtonSecondary = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${Color.White};
  background-color: ${Color.Graphite};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    color: ${Color.Light};
  }

  :active {
    box-shadow: inset 5px 5px 5px ${Color.Black};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Color.Secondary};
  background-color: ${Color.Graphite};
  border: 1px solid ${Color.Secondary};
  border-radius: 10px;

  :focus {
    color: ${Color.White};
    outline: none;
    border: 1px solid ${Color.PrimaryDark};
  }
`;
