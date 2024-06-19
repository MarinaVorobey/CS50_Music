import Image from "next/image";
import { colors } from "../../colors";
import Icon from "../../icon";
import { ITrack } from "@/app/lib/definitions";
import styles from "./track.module.css";
import { formatDuration, formatTimePassed } from "@/app/lib/utils";

export default function Track({ trackData }: { trackData: ITrack }) {
  const { id, name, path, image, duration, createdAt, album, artist, liked } =
    trackData;

  return (
    <>
      <div className={styles.item__number}>1</div>
      <div className={styles.item__name}>
        <Image
          width={60}
          height={60}
          className={styles.img}
          src={image}
          alt={name}
        />
        <div className={styles.content}>
          <h3 className={styles.name}>
            <a className={styles.name__link} href="#">
              {name}
            </a>
          </h3>
          <span className={styles.author}>{artist}</span>
        </div>
      </div>
      <div className={styles.item__album}>{album}</div>
      <div className={`${styles.item__data} flex`}>
        <span className={styles.data__text}>{formatTimePassed(createdAt)}</span>
        <button className={styles.like__btn}>
          <Icon
            type="heart"
            defaultColor={liked ? colors.orange : colors.greyA4}
          />
        </button>
      </div>
      <time className={styles.item__time}>{formatDuration(duration)}</time>
      <div className={styles.item__drop}>
        <button className={id !== 1 ? styles.btn__add : styles.btn__remove}>
          <Icon
            type={id !== 1 ? "plus" : "minus"}
            defaultColor={colors.greyC4}
          />
        </button>
      </div>
    </>
  );
}
