import styles from "./register.module.css";

interface IRegisterProps {
  onClose: () => void;
  switchType: () => void;
}

export default function Register({ onClose, switchType }: IRegisterProps) {
  return (
    <form method="POST" className={styles.content}>
      <h2 className={styles.h2}>Register</h2>
      <label className={styles.email__label} htmlFor="register-email">
        Email:
      </label>
      <input
        name="email"
        id="register-email"
        className={styles.email}
        type="email"
      />

      <label className={styles.password__label} htmlFor="register-password">
        Password:
      </label>
      <input
        name="password"
        id="register-password"
        className={styles.password}
        type="text"
      />

      <label
        className={styles.repeat__password__label}
        htmlFor="register-repeat"
      >
        Repeat password:
      </label>
      <input
        className={styles.repeat__password}
        id="register-repeat"
        type="text"
        name="repeat-password"
      />
      <div className={styles.submit__block}>
        <button className={styles.submit__btn} type="submit">
          Register
        </button>
        <button onClick={onClose} type="button" className={styles.close__btn}>
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
