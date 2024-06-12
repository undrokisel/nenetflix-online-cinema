import { ReactNode } from "react";
import ReactDOM from "react-dom";

export enum PortalTarget {
  ROOT = "root",
  PORTAL = "portal",
}

interface IProps {
  children: ReactNode;
  target: string;
}

const ReactPortal = ({ children, target }: IProps) => {
  const root = document.getElementById(target);

  return root ? ReactDOM.createPortal(children, root) : null;
};
export default ReactPortal;
