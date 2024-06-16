import Logo from "./logo";
import User from "./user";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={`${styles.header} flex`}>
      <Logo />
      <div className={styles.search}>
        <input
          className={styles.search__field}
          type="search"
          placeholder="WHAT WOULD YOU LIKE TO FIND?"
        />
      </div>
      <User />
    </header>
  );
}
