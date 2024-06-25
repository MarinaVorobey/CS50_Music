import styles from "./register.module.css";
import generalStyles from "../modal.module.css";

interface IRegisterProps {
  onClose: () => void;
  switchType: () => void;
}

export default function Register({ onClose, switchType }: IRegisterProps) {
  return (
    <form method="POST" className={styles.content}>
      <h2 className={generalStyles.title}>Register</h2>
      <label className={generalStyles.label} htmlFor="register-email">
        Email:
      </label>
      <input
        name="email"
        id="register-email"
        className={generalStyles.input}
        type="email"
      />

      <label className={generalStyles.label} htmlFor="register-password">
        Password:
      </label>
      <input
        name="password"
        id="register-password"
        className={generalStyles.input}
        type="text"
      />

      <label className={generalStyles.label} htmlFor="register-repeat">
        Repeat password:
      </label>
      <input
        className={generalStyles.input}
        id="register-repeat"
        type="text"
        name="repeat-password"
      />
      <div className={generalStyles.submit__block}>
        <button className={generalStyles.submit__btn} type="submit">
          Register
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
        Already have an account?{" "}
        <button
          onClick={switchType}
          type="button"
          className={styles.switch__btn}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
