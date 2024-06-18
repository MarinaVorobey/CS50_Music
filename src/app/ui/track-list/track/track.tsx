import Image from "next/image";
import { colors } from "../../colors";
import Icon from "../../icon";
import { ITrack } from "@/app/lib/data";
import styles from "./track.module.css";

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
          src="/covers/cover3.jpg"
          alt="In Bloom"
        />
        <div className={styles.content}>
          <h3 className={styles.name}>
            <a className={styles.name__link} href="#">
              In Bloom
            </a>
          </h3>
          <span className={styles.author}>Nirvana</span>
        </div>
      </div>
      <div className={styles.item__album}>Nirvana</div>
      <div className={`${styles.item__data} flex`}>
        <span className={styles.data__text}>6 days ago</span>
        <button className={styles.like__btn}>
          <Icon
            type="heart"
            defaultColor={liked ? colors.orange : colors.greyA4}
          />
        </button>
      </div>
      <time className={styles.item__time}>5:35</time>
      <div className={styles.item__drop}>
        <button className={styles.btn__dropdown}>
          <Icon type="three-dots" defaultColor={colors.greyC4} />
        </button>
        <div className={styles.dropdown}>
          <button className={styles.add__btn}>Добавить в плейлист</button>
          <button className={styles.delete__btn}>Удалить из плейлиста</button>
        </div>
      </div>
    </>
  );
}
