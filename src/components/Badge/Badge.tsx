import { StyledBadge } from "./styles";

interface IBadgeProps {
  count: number;
}

export const Badge = ({ count }: IBadgeProps) => {
  return <StyledBadge>{count}</StyledBadge>;
};
