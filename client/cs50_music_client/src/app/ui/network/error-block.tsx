"use client";

import SuggestAuth from "./suggest-auth";
import styles from "./network.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ErrorBlock({
  status,
  message,
}: {
  status: number;
  message: string;
}) {
  const pathname = usePathname();
  if (status === 401) {
    return <SuggestAuth message={message} />;
  }

  message =
    status === 403
      ? "You seam to have tried to get data of another user."
      : status === 404
      ? "The content you are trying to access does not exist."
      : status === 500
      ? "There have been an error on the server. Try reloading the page later."
      : "Something went wrong.";

  return (
    <div>
      <h4 className={styles.error__title}>{`Error ${status}`}</h4>
      <p className={styles.error__block}>{message}</p>
      {pathname !== "/" ? (
        <Link className="not_found__link" href="/">
          Go to Home page
        </Link>
      ) : null}
    </div>
  );
}
