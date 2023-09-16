import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import styled, { css } from "styled-components";
import Button from "./Button";
import Overlay from "./Overlay";
import { createPortal } from "react-dom";

const StyledModelContainer = styled.div`
  background-color: var(--color-grey-0);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  z-index: 1000;
  transition: all 0.5s ease 0s;
  div:first-child {
    margin-top: 2.4rem;
  }

  .closeBtn {
    position: absolute;
    top: 0.5rem;
    right: 0rem;
  }
`;
const ModelContext = createContext();
export default function Model({ children }) {
  const [isOpen, setIsOpen] = useState(null);
  const close = () => setIsOpen(null);
  const cancel = () => setIsOpen(null);

  const open = setIsOpen;
  return (
    <ModelContext.Provider
      value={{
        close,
        open,
        isOpen,
        cancel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}
const CloseBtn = (props) => {
  const { close } = useContext(ModelContext);
  const handleClose = (e) => {
    e.stopPropagation();
    close();
  };
  return <Button {...props} onClick={handleClose} />;
};
const OpenBtn = ({ children, name }) => {
  const { isOpen, open } = useContext(ModelContext);
  const handleOpen = () => {
    open(name);
  };
  return cloneElement(children, {
    onClick: () => handleOpen(),
    style: { width: "fit-content" },
  });
};

const ModelContainer = (props) => {
  const { isOpen, close } = useContext(ModelContext);
  const handleClose = (e) => {
    e.stopPropagation();
    close();
  };
  if (isOpen !== props.name) return null;
  return createPortal(
    <>
      <Overlay onClick={handleClose} />
      <StyledModelContainer>{props.children}</StyledModelContainer>
    </>,
    document.body,
  );
};
function ModelWindow({ children }) {
  return <div>{children}</div>;
}
const CancelBtn = (props) => {
  const { cancel } = useContext(ModelContext);
  const handleCancel = (e) => {
    e.stopPropagation();
    props.onClick?.();
    // cancel();
  };
  return <Button {...props} onClick={handleCancel} />;
};
Model.Container = ModelContainer;
Model.Close = CloseBtn;
Model.Cancel = CancelBtn;

Model.Open = OpenBtn;
Model.Window = ModelWindow;
