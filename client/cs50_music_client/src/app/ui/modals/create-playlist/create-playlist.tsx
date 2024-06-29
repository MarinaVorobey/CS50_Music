import generalStyles from "../modal.module.css";
import styles from "./create-playlist.module.css";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function CreatePlaylist({ onClose }: { onClose: () => void }) {
  const coverNums = Array.from(Array(8).keys());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      method="POST"
      className={styles.form}
    >
      <h3 className={generalStyles.title}>Create playlist</h3>
      <label className={generalStyles.label} htmlFor="playlistName">
        Name:
      </label>
      <input
        {...register("playlistName", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        id="playlistName"
        className={generalStyles.input}
      />
      {errors.playlistName && (
        <p className={generalStyles.error__block}>
          The playlist name must be no less than 5 symbols and no more than 150
        </p>
      )}
      <p className={generalStyles.label}>Cover:</p>
      <ul className={styles.cover__choice}>
        {coverNums.map((i) => (
          <li key={i + 1} className={styles.choice__item}>
            <label className={styles.choice__label}>
              <input
                type="radio"
                className={`${styles.choice__input} visually-hidden`}
                value={i + 1}
                id={`${i + 1}`}
                {...(register("coverNumber"),
                {
                  required: true,
                })}
                name="cover-number"
              />
              <Image
                priority={true}
                width={60}
                height={60}
                className={styles.chioce__img}
                src={`/playlist_covers/playlists%20(${i + 1}).jpg`}
                alt={`Playlist cover number ${i + 1}`}
              />
            </label>
          </li>
        ))}
      </ul>
      <div className={generalStyles.submit__block}>
        <button className={generalStyles.submit__btn} type="submit">
          Create
        </button>
        <button
          onClick={onClose}
          type="button"
          className={generalStyles.close__btn}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
