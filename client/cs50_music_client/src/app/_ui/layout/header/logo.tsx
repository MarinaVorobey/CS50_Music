import Link from "next/link";
import Image from "next/image";
import { lobster } from "../../fonts";
import styles from "./header.module.css";

export default function Logo() {
  return (
    <Link href="/" className={`${styles.logo} ${lobster.className}`}>
      <Image
        src="/logo.png"
        alt="Solar_Music logo as a link to main page"
        width={50}
        height={50}
        className={styles.logo__img}
      />
      <span className={styles.logo__text}>Solar_Music</span>
    </Link>
  );
}
