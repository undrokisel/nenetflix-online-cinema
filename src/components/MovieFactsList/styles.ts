import styled from "styled-components";
import { Body2, Color, Subtitle3, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const MovieFacts = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: ${Space.S};
  max-width: 80%;
`;
export const Fact = styled(Subtitle3)`
  color: ${Color.Secondary};
`;

export const Value = styled(Body2)<IProps>`
  color: ${({ $isLightMode }) => ($isLightMode ? Color.Secondary : Color.White)};
`;
