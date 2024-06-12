import { StylesConfig } from "react-select";
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
import { MovieTypeOption } from "types";
import { Color, H2, Space, Body2, ButtonPrimary, ButtonSecondary, Input, Subtitle3 } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${Space.M};
  width: 100%;
  max-height: 90%;
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

export const RadioGroup = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${Color.Graphite};
`;

export const StyledRadio = styled.input`
  display: none;

  :checked + label {
    background: ${Color.Graphite};
  }
`;

export const StyledLabel = styled.label`
  width: 50%;
  padding: 16px 30px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${Color.White};
  background: ${Color.Dark};
  cursor: pointer;
  transition: background 0.1s;

  :first-of-type {
    border-right: 1px solid ${Color.Black};
  }
`;

export const selectStyles: StylesConfig<MovieTypeOption, boolean> = {
  control: (styles, state) => ({
    ...styles,
    minHeight: "30px",
    borderRadius: "10px",
    border: "1px solid ",
    borderColor: state.hasValue ? `${Color.PrimaryLight}` : `${Color.Dark}`,
    backgroundColor: `${Color.Graphite}`,
    cursor: "pointer",
  }),

  valueContainer: (styles) => ({
    ...styles,
    padding: "16px 5px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: `${Color.White}`,
    border: `1px solid ${Color.Graphite}`,
    borderRadius: "10px",
  }),

  singleValue: (styles) => ({
    ...styles,
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: `${Color.White}`,
  }),

  indicatorsContainer: (styles) => ({
    ...styles,
    div: {
      padding: "0px 5px",
    },
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),

  menu: (styles) => ({
    ...styles,
    overflow: "hidden",
    backgroundColor: `${Color.Dark}`,
    borderRadius: "10px",
  }),

  option: (styles, state) => ({
    ...styles,
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: state.isFocused ? `${Color.PrimaryLight}` : `${Color.White}`,
    backgroundColor: state.isFocused ? `${Color.Graphite}` : `${Color.Dark}`,
    cursor: "pointer",
  }),
};
