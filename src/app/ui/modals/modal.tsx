import Login from "./login/login";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Register from "./register/register";
import Confirm from "./confirm/confirm";
import AddToPlaylist from "./add-to-playlist/add-to-playlist";

interface IModalProps {
  onClose: () => void;
  type: "login" | "register" | "confirm" | "addToPlaylist";
  data?: any;
}

const typesToModals = {
  login: Login,
  register: Register,
  confirm: Confirm,
  addToPlaylist: AddToPlaylist,
};

export default function Modal({ onClose, type, data }: IModalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const modalProps =
    type === "addToPlaylist"
      ? { onClose: onClose }
      : { ...data, onClose: onClose };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      {ReactDOM.createPortal(
        <div className={styles.modal}>{typesToModals[type](modalProps)}</div>,
        modalRoot
      )}
    </>
  );
}
