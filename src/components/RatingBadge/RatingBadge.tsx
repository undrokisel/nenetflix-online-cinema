import { StyledBadge } from "./styles";

interface IProps {
  rating: string;
}

export const RatingBadge = ({ rating }: IProps) => {
  return <StyledBadge rating={rating}>{rating}</StyledBadge>;
};
