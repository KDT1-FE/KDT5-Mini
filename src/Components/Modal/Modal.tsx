import { PropsWithChildren } from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  visibility: boolean;
  toggle: (param: boolean) => void;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const navigate = useNavigate();
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
            navigate("/mypage");
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
