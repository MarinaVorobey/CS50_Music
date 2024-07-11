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
  } = useForm({ mode: "onSubmit" });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className={styles.content}
      method="POST"
    >
      <h2 className={generalStyles.title}>Log in</h2>
      <label className={generalStyles.label} htmlFor="loginUsername">
        Username:
      </label>
      <input
        {...register("loginUsername", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        key="login-username"
        id="loginUsername"
        name="loginUsername"
        className={generalStyles.input}
      />
      {errors.loginUsername && (
        <p className={generalStyles.error__block}>
          {errors.loginUsername.type === "minLength"
            ? "Username must be at least 5 characters in length"
            : errors.loginUsername.type === "maxLength"
            ? "Username must be at max 150 characters in length"
            : "Username is required"}
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
