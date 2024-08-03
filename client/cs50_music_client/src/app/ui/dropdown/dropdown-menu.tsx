"use client";

import { useCloseByClickout } from "@/app/lib/utils";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./dropdown.module.css";

interface IDropdownMenuProps {
  coords: {
    left: number;
    top: number;
  };
  onClose: () => void;
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function DropdownMenu({
  coords,
  onClose,
  children,
  containerRef,
}: IDropdownMenuProps) {
  const dropdownRoot = document.getElementById("dropdown-root");
  useCloseByClickout(containerRef, onClose);
  if (!dropdownRoot) return null;

  return (
    <div className={styles.container}>
      {ReactDOM.createPortal(
        <div
          style={coords}
          className={`${styles.list} ${styles.pointer}`}
          onClick={onClose}
        >
          {children}
        </div>,
        dropdownRoot
      )}
    </div>
  );
}
