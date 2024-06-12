import { Color } from "ui";
import { Spinner } from "./styles";

interface IProps {
  color: Color;
  still?: boolean;
  size?: string;
}

export const CustomSpinner = ({ color, still, size }: IProps) => {
  return <Spinner color={color} still={still} size={size} />;
};
