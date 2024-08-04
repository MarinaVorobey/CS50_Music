"use client";

import { useState } from "react";
import Modal, { TModals } from "../modals/modal";
import styles from "./network.module.css";

export default function SuggestAuth({ message }: { message: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TModals>("login");
  const [registered, setRegistered] = useState(false);

  return (
    <div className={styles.text__block}>
      <h4 className={styles.title}>You are not logged in</h4>
      <p className={styles.message}>{message}</p>
      <p className={styles.suggest}>
        <button
          aria-label="Open login modal form"
          onClick={() => {
            setModalOpen(true);
            setModalType("login");
          }}
          className={styles.modal__btn}
        >
          Log in
        </button>
        <span>or</span>
        <button
          aria-label="Open register modal form"
          onClick={() => {
            setModalOpen(true);
            setModalType("register");
          }}
          className={styles.modal__btn}
        >
          Register
        </button>
      </p>

      {modalOpen ? (
        <Modal
          type={modalType}
          onClose={() => {
            setRegistered(false);
            setModalOpen(false);
          }}
          data={{
            switchType: (registerRedirect: boolean) => {
              setRegistered(registerRedirect);
              setModalType((prev) => (prev === "login" ? "register" : "login"));
            },
            redirected: registered,
          }}
        />
      ) : null}
    </div>
  );
}
