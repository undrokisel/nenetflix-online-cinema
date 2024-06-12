import { PortalTarget, ReactPortal } from "components";
import { Message, StyledModal, Window } from "./styles";

interface IProps {
  message: string;
}

export const AuthModal = ({ message }: IProps) => {
  return (
    <ReactPortal target={PortalTarget.PORTAL}>
      <StyledModal>
        <Window>
          <Message>{message}</Message>
        </Window>
      </StyledModal>
    </ReactPortal>
  );
};
