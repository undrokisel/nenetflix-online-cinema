import styled from "styled-components";
import {
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { Color, H2, Body2, ButtonPrimary, ButtonSecondary, Input, Subtitle3, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Space.M};
  max-width: 1165px;
  border-radius: 10px;
`;

export const Title = styled(H2)<IProps>`
  text-align: left;
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.White)};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Body = styled.div<JustifyContentProps & AlignItemsProps & IProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${Space.XS};
  justify-content: space-between;
  justify-items: end;
  ${justifyContent};
  ${alignItems}
  width: 100%;
  padding: ${Space.S};
  background: ${({ $isLightMode }) => ($isLightMode ? Color.Light : Color.Dark)};
  border-radius: 10px;
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

export const InputField = styled.div<LayoutProps & SpaceProps>`
  display: flex;
  flex-direction: column;
  gap: ${Space.SMALLEST};
  width: 100%;
  ${layout}
  ${space}
`;

export const Control = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

export const Cancel = styled(ButtonSecondary)``;
export const Save = styled(ButtonPrimary)``;

export const FieldDescription = styled(Body2)<IProps>`
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Dark : Color.Light)};
`;
