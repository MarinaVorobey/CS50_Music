import Link from "next/link";
import { colors } from "../../colors";
import Icon from "../../icon";
import styles from "./header.module.css";

export default function User() {
  return (
    <div className={styles.user}>
      <Icon
        type="user"
        className={styles.user__icon}
        defaultColor={colors.greyAA}
      />
      <span className={styles.user__text}>Anonymous</span>
      <Link className={styles.user__auth} href="/login">
        <Icon
          type="door"
          className={styles.user__auth__icon}
          defaultColor={colors.greyAA}
        />
      </Link>
    </div>
  );
}
