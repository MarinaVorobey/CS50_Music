import styles from "./login.module.css";
import generalStyles from "../modal.module.css";
import { useForm } from "react-hook-form";

interface ILoginProps {
  onClose: () => void;
  switchType: () => void;
}

export default function Login({ onClose, switchType }: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.content}
      method="POST"
    >
      <h2 className={generalStyles.title}>Log in</h2>
      <label className={generalStyles.label} htmlFor="loginEmail">
        Email:
      </label>
      <input
        {...register("loginEmail", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        key="login-email"
        id="loginEmail"
        name="loginEmail"
        className={generalStyles.input}
        type="email"
      />
      {errors.loginEmail && (
        <p className={generalStyles.error__block}>
          {errors.loginEmail.type === "minLength"
            ? "Email must be at least 5 characters in length"
            : errors.loginEmail.type === "maxLength"
            ? "Email must be at max 150 characters in length"
            : "Email is required"}
        </p>
      )}

      <label className={generalStyles.label} htmlFor="loginPassword">
        Password:
      </label>
      <input
        {...register("loginPassword", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        key="login-password"
        id="loginPassword"
        name="loginPassword"
        className={generalStyles.input}
        type="password"
      />
      {errors.loginPassword && (
        <p className={generalStyles.error__block}>
          {errors.loginPassword.type === "minLength"
            ? "Password must be at least 5 characters in length"
            : errors.loginPassword.type === "maxLength"
            ? "Password must be at max 150 characters in length"
            : "Password is required"}
        </p>
      )}
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
