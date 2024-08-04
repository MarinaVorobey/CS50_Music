"use client";

import { Suspense, useState } from "react";
import { colors } from "../../colors";
import { Dropdown } from "../../dropdown/dropdown";
import Icon from "../../icon";
import Modal, { TModals } from "../../modals/modal";
import styles from "./track.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { removeFromPlaylist } from "@/app/lib/data";
import { checkRemovedQueueIntegrity } from "@/app/lib/player-control";
import { IArtist } from "@/app/lib/definitions";

interface ITrackDropdownProps {
  playlist: string;
  id: string;
  artist: IArtist;
  license: string;
  created_at: string;
  userToken: UseQueryResult<string | null, Error>;
}

export default function TrackDropdown({
  playlist,
  id,
  artist,
  license,
  userToken,
  created_at,
}: ITrackDropdownProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TModals>("legalInfo");

  const queryClient = useQueryClient();
  const removeTrackAction = useMutation({
    mutationFn: () => removeFromPlaylist(playlist, `${id}`),
    onSuccess: () => {
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
      checkRemovedQueueIntegrity("playlist", queryClient, `${id}`, playlist);
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const button = (
    <button aria-label="Open dropdown menu" className={styles.dropdown__btn}>
      <Icon type="three-dots" defaultColor={colors.greyC4} />
    </button>
  );

  return (
    <>
      <Dropdown
        leftShift={
          !userToken.data
            ? -60
            : !pathname.includes("playlist") || searchParams.get("query")
            ? -85
            : -125
        }
        button={button}
      >
        {userToken.data ? (
          <button
            onClick={() => {
              setModalType(
                !pathname.includes("playlist") || searchParams.get("query")
                  ? "addToPlaylist"
                  : "confirm"
              );
              setModalOpen(true);
            }}
            className={styles.dropdown__option}
          >
            {!pathname.includes("playlist") || searchParams.get("query")
              ? "Add to playlist"
              : "Remove\u00A0from\u00A0playlist"}
          </button>
        ) : null}
        <button
          onClick={() => {
            setModalType("legalInfo");
            setModalOpen(true);
          }}
          className={styles.dropdown__option}
        >
          Legal info
        </button>
      </Dropdown>

      {modalOpen ? (
        modalType === "legalInfo" ? (
          <Modal
            data={{
              artist: artist.name,
              license: license,
              created: created_at,
            }}
            onClose={() => setModalOpen(false)}
            type="legalInfo"
          />
        ) : modalType === "addToPlaylist" ? (
          <Modal
            data={{
              id: id,
            }}
            onClose={() => setModalOpen(false)}
            type="addToPlaylist"
          />
        ) : (
          <Modal
            onClose={() => setModalOpen(false)}
            type="confirm"
            data={{
              title: "Remove song from the playlist?",
              confirmText: "Remove",
              onConfirm: removeTrackAction.mutate,
            }}
          />
        )
      ) : null}
    </>
  );
}
