import styles from "./login.module.css";

interface ILoginProps {
  onClose: () => void;
  switchType: () => void;
}

export default function Login({ onClose, switchType }: ILoginProps) {
  return (
    <form className={styles.content} method="POST">
      <h2 className={styles.title}>Log in</h2>
      <label className={styles.email__label} htmlFor="login-email">
        Email:
      </label>
      <input
        name="email"
        id="login-email"
        className={styles.email}
        type="email"
      />

      <label className={styles.password__label} htmlFor="login-password">
        Password:
      </label>
      <input
        name="password"
        id="login-password"
        className={styles.password}
        type="text"
      />
      <div className={styles.submit__block}>
        <button className={styles.submit__btn} type="submit">
          Log in
        </button>
        <button onClick={onClose} type="button" className={styles.close__btn}>
          Cancel
        </button>
      </div>
      <div>
        Don&apos;t have an account?{" "}
        <button
          onClick={switchType}
          type="button"
          className={styles.switch__btn}
        >
          Register
        </button>
      </div>
    </form>
  );
}
