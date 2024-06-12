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

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Space.XS};
`;

export const StyledInput = styled(Input)<IProps>`
  background-color: ${({ $isLightMode }) => ($isLightMode ? Color.White : Color.Dark)};
  border-color: ${({ $isLightMode }) => ($isLightMode ? Color.Secondary : Color.Black)};

  :focus {
    color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
  }
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

export const Error = styled(Body2)`
  color: ${Color.Error};
`;
