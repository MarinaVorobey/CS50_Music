import Logo from "./logo";
import User from "./user";
import styles from "./header.module.css";
import Search from "./search";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className={`${styles.header} flex`}>
      <Logo />
      <Suspense>
        <Search />
        <User />
      </Suspense>
    </header>
  );
}
