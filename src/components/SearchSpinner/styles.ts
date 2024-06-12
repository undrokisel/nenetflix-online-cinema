import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";

export const SpinnerContiner = styled.div<LayoutProps>`
  display: flex;
  place-items: center;
  justify-content: space-around;
  ${layout}
  height: 70vh;
`;
