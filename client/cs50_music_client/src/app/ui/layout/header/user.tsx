"use client";

import { useState } from "react";
import { colors } from "../../colors";
import Icon from "../../icon";
import styles from "./header.module.css";
import Modal, { TModals } from "../../modals/modal";

export default function User() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TModals>("login");

  return (
    <div className={styles.user}>
      <Icon
        type="user"
        className={styles.user__icon}
        defaultColor={colors.greyAA}
      />
      <span className={styles.user__text}>Anonymous</span>
      <button onClick={() => setModalOpen(true)} className={styles.user__auth}>
        <Icon
          type="door"
          className={styles.user__auth__icon}
          defaultColor={colors.greyAA}
        />
      </button>
      {modalOpen ? (
        <Modal
          type={modalType}
          onClose={() => setModalOpen(false)}
          data={{
            switchType: () =>
              setModalType((prev) => (prev === "login" ? "register" : "login")),
          }}
        />
      ) : null}
    </div>
  );
}
