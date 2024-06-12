import { ReactNode } from "react";
import { useMatch } from "react-router-dom";
import { ROUTE } from "router";
import { StyledLink } from "./styles";

interface IProps {
  text?: string;
  to: ROUTE | `/${ROUTE}`;
  children?: ReactNode;
  count?: number;
}

export const CustomLink = ({ text, to, children, count, ...props }: IProps) => {
  
  const isActive = useMatch(to);


  return (
    <StyledLink {...props} isactive={isActive} to={to}>
      {children}
      {text && <span>{text}</span>}
    </StyledLink>
  );
};
