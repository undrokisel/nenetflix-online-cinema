import { Link } from "react-router-dom";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { Color, H2, Body2, Input, Subtitle3, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const StyledForm = styled.form<LayoutProps & SpaceProps & IProps>`
  display: flex;
  flex-direction: column;
  gap: ${Space.L};
  align-self: center;
  width: 272px;
  padding: ${Space.S};
  ${layout};
  ${space};
  background: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border-radius: 10px;
`;
export const Title = styled(H2)<IProps>`
  text-align: left;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const ResetPassword = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${Color.Secondary};
  :hover {
    color: ${Color.PrimaryDark};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Space.XS};
`;

export const SignUp = styled(Body2)`
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${Color.Secondary};
`;

export const SignUpLink = styled(Link)`
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
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border-color: ${({ $isLightMode }) => ($isLightMode ? Color.Secondary : Color.Black)};
`;

export const FieldTitle = styled(Subtitle3)<IProps>`
  padding-bottom: 8px;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Space.SMALLEST};
`;
