import { ReactNode } from "react";
import { StyledButton } from "./styles";

interface IProps {
  text?: string;
  children?: ReactNode;
  onClick: () => void;
}

export const CustomButton = ({ text, children, ...props }: IProps) => {
  
  return (
    <StyledButton {...props}>
      {children}
      {text && <span>{text}</span>}
    </StyledButton>
  );
};
