"use client";

import { useEffect, useState } from "react";
import { colors } from "../../colors";
import Icon from "../../icon";
import styles from "./header.module.css";
import Modal, { TModals } from "../../modals/modal";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getUserToken, logout } from "@/app/lib/data";
import { AxiosError, AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";

export default function User() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TModals>("login");
  const [registered, setRegistered] = useState(false);

  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const [username, setUsername] = useState("Anonymous");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userObject = window.localStorage.getItem("user");
    if (userObject) {
      setUsername(JSON.parse(userObject).username);
      setLoggedIn(true);
    }
  }, [userToken]);

  const queryClient = useQueryClient();
  const logoutFn: UseMutationResult<
    AxiosResponse | null,
    AxiosError,
    FieldValues
  > = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setUsername("Anonymous");
      setLoggedIn(false);
      setModalOpen(false);
    },
  });

  return (
    <div className={styles.user}>
      <Icon
        type="user"
        className={styles.user__icon}
        defaultColor={!loggedIn ? colors.greyAA : colors.orange}
      />
      <span className={styles.user__text}>{username}</span>
      <button onClick={() => setModalOpen(true)} className={styles.user__auth}>
        <Icon
          type="door"
          className={styles.user__auth__icon}
          defaultColor={colors.greyAA}
        />
      </button>
      {modalOpen ? (
        loggedIn ? (
          <Modal
            onClose={() => setModalOpen(false)}
            type="confirm"
            data={{
              title: "Log out of your account?",
              confirmText: "Log out",
              onConfirm: logoutFn.mutate,
            }}
          />
        ) : (
          <Modal
            type={modalType}
            onClose={() => {
              setRegistered(false);
              setModalOpen(false);
            }}
            data={{
              switchType: (registerRedirect: boolean) => {
                setRegistered(registerRedirect);
                setModalType((prev) =>
                  prev === "login" ? "register" : "login"
                );
              },
              redirected: registered,
            }}
          />
        )
      ) : null}
    </div>
  );
}
