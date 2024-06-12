import styled from "styled-components";
import { Color, H2 } from "ui";

export const StyledErrorMessage = styled(H2)`
  place-self: center;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${Color.Error};
`;
