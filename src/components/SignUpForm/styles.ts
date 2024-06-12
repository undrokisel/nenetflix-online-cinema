import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  flexDirection,
  FlexDirectionProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import { Color, H2, Space, Body2, Input, Subtitle3 } from "ui";

interface IProps {
  $isLightMode: boolean;
  children?: ReactNode;
}

export const StyledCheckbox = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled.form<PositionProps & LayoutProps & SpaceProps & IProps>`
  position: absolute;
  ${position};
  display: flex;
  flex-direction: column;
  gap: ${Space.SMALLEST};
  align-self: center;
  ${layout};
  ${space};
  margin: 90px auto;
  padding: ${Space.S};
  background: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border-radius: 10px;
`;
export const Title = styled(H2)<IProps>`
  text-align: center;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const Body = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: ${Space.XS};
`;

export const SignIn = styled(Body2)`
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${Color.Secondary};
`;

export const SignInLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${Color.PrimaryLight};
  :hover {
    color: ${Color.PrimaryDark};
  }
`;

export const StyledInput = styled(Input)<IProps>`
  padding: 10px 10px;
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border-color: ${({ $isLightMode }) => ($isLightMode ? Color.Secondary : Color.White)};

  :focus {
    color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
  }
`;

export const FieldTitle = styled(Subtitle3)<IProps>`
  text-align: center;
  padding-bottom: 8px;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const CheckBoxLabel = styled(Subtitle3)<IProps>`
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Space.SMALLEST};
`;

export const Field = styled.div<FlexDirectionProps>`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  
  gap: 18px;
  ${flexDirection}
`;
