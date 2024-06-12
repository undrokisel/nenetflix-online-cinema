import styled from "styled-components";
import { layout, LayoutProps } from "styled-system";
import { H3, Space } from "ui";

export const EmptyPage = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: space-around;
  gap: ${Space.M};
  ${layout}
`;

export const Message = styled(H3)``;
