import Logo from "./logo";
import User from "./user";
import styles from "./header.module.css";
import Search from "./search";

export default function Header() {
  return (
    <header className={`${styles.header} flex`}>
      <Logo />
      <Search />
      <User />
    </header>
  );
}
