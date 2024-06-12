import { SpinnerCircular } from "spinners-react";
import styled from "styled-components";

interface IProps {
  size?: string;
}

export const Spinner = styled(SpinnerCircular)<IProps>`
  place-self: center;
  width: ${(props) => props.size && props.size};
`;
