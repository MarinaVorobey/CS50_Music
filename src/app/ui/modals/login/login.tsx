import styles from "./login.module.css";
import generalStyles from "../modal.module.css";

interface ILoginProps {
  onClose: () => void;
  switchType: () => void;
}

export default function Login({ onClose, switchType }: ILoginProps) {
  return (
    <form className={styles.content} method="POST">
      <h2 className={generalStyles.title}>Log in</h2>
      <label className={generalStyles.label} htmlFor="login-email">
        Email:
      </label>
      <input
        key="login-email"
        name="login-email"
        id="login-email"
        className={generalStyles.input}
        type="email"
      />

      <label className={generalStyles.label} htmlFor="login-password">
        Password:
      </label>
      <input
        key="login-password"
        name="login-password"
        id="login-password"
        className={generalStyles.input}
        type="text"
      />
      <div className={generalStyles.submit__block}>
        <button className={generalStyles.submit__btn} type="submit">
          Log in
        </button>
        <button
          onClick={onClose}
          type="button"
          className={generalStyles.close__btn}
        >
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
