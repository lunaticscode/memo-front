import {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";

interface ModalProps extends PropsWithChildren {
  content: ReactElement;
  customStyled: CSSProperties;
}
const Modal: FC<ModalProps> = ({ content, customStyled }) => {
  return <>{cloneElement(content, { style: customStyled })}</>;
};
export default Modal;
