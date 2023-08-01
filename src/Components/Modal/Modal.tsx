import { PropsWithChildren } from "react";
import "./Modal.scss";


export default function Modal(props: PropsWithChildren<ModalProps>) {
  return (
    <div
      className="modal-overlay"
      style={{ display: props.visibility ? "flex" : "none" }}
    >
      <div className="modal-window">
        {props.children}
        <button
          className="modal-close"
          onClick={() => {
            props.toggle(false);
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
