import Login from "./login/login";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Register from "./register/register";
import Confirm from "./confirm/confirm";
import AddToPlaylist from "./add-to-playlist/add-to-playlist";
import CreatePlaylist from "./create-playlist/create-playlist";
import LegalInfo from "./legal-info/legal-info";

export type TModals =
  | "login"
  | "register"
  | "confirm"
  | "addToPlaylist"
  | "createPlaylist"
  | "legalInfo";

interface IModalProps {
  onClose: () => void;
  type: TModals;
  data?: any;
}

const typesToModals = {
  login: Login,
  register: Register,
  confirm: Confirm,
  addToPlaylist: AddToPlaylist,
  createPlaylist: CreatePlaylist,
  legalInfo: LegalInfo,
};

export default function Modal({ onClose, type, data }: IModalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const modalProps = { ...data, onClose: onClose };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>{typesToModals[type](modalProps)}</div>
    </>,
    modalRoot
  );
}
