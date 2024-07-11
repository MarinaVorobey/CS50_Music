"use client";

import styles from "./header.module.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form id="search" method="POST" className={styles.search}>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.search__field}
        type="search"
        placeholder="WHAT WOULD YOU LIKE TO FIND?"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </form>
  );
}
