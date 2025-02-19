"use client";

import React, { RefObject } from "react";
import { DropdownMenu } from "./dropdown-menu";
import { useGetCoords } from "@/app/_lib/utils";

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  leftShift?: number;
  topShift?: number;
  showTopPointer?: boolean;
}

export function Dropdown({
  button,
  children,
  onClose,
  leftShift,
  topShift,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef: RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  if (!leftShift) {
    leftShift = 0;
  }
  if (!topShift) {
    topShift = 0;
  }
  const [coords] = useGetCoords(
    containerRef,
    isDropdownOpen,
    leftShift,
    topShift
  );

  return (
    <div ref={containerRef} className="dropdown">
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{button}</div>
      {isDropdownOpen && coords && (
        <DropdownMenu
          coords={coords}
          onClose={() => {
            setIsDropdownOpen(false);
            if (onClose) {
              onClose();
            }
          }}
          containerRef={containerRef}
        >
          {children}
        </DropdownMenu>
      )}
    </div>
  );
}
