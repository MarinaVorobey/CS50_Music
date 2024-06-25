import styles from "./header.module.css";

export default function Search() {
  return (
    <div id="search" className={styles.search}>
      <input
        className={styles.search__field}
        type="search"
        placeholder="WHAT WOULD YOU LIKE TO FIND?"
      />
    </div>
  );
}
