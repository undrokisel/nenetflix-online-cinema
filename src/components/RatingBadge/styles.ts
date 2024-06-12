import styled from "styled-components";
import { Color, Subtitle3 } from "ui";
import { getRatingBadgeColor } from "utils";

interface IProps {
  rating: string;
}

export const StyledBadge = styled(Subtitle3)<IProps>`
  display: inline-block;
  padding: 2px 8px;
  color: ${Color.White};
  background-color: ${(props) => getRatingBadgeColor(props.rating)};
  border-radius: 6px;
`;
