import styles from "./login.module.css";
import generalStyles from "../modal.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { login } from "@/app/_lib/data";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ILoginResponse } from "@/app/_lib/definitions";
import Icon from "../../icon";
import { colors } from "../../colors";

interface ILoginProps {
  onClose: () => void;
  switchType: (r: boolean) => void;
  redirected: boolean;
}

export default function Login({
  onClose,
  switchType,
  redirected,
}: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", shouldUnregister: true });

  const queryClient = useQueryClient();
  const mutation: UseMutationResult<ILoginResponse, AxiosError, FieldValues> =
    useMutation({
      mutationFn: login,
      onSuccess: () => {
        queryClient.invalidateQueries();
        onClose();
      },
    });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className={styles.content}
      method="POST"
    >
      <h2 className={generalStyles.title}>Log in</h2>
      {redirected ? <p>Registered successfully. Now you can log in.</p> : null}
      {mutation.isError ? (
        <p
          key="login-error"
          className={`${generalStyles.error__block} ${generalStyles.mutation__error}`}
        >
          {mutation.error.response?.status === 401
            ? "Wrong username or password"
            : mutation.error.message}
        </p>
      ) : null}
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
        <button
          aria-label="Submit form"
          className={`${generalStyles.submit__btn}${
            mutation.isPending ? " " + generalStyles.submit__pending : ""
          }`}
          disabled={mutation.isPending}
          type="submit"
        >
          {mutation.isPending ? (
            <Icon
              type="loading"
              className={`loading__icon ${generalStyles.modal__loading}`}
              defaultColor={colors.purple}
            />
          ) : null}
          Log in
        </button>
        <button
          aria-label="Close modal"
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
          aria-label="Switch to the register form"
          onClick={() => {
            mutation.reset();
            switchType(false);
          }}
          type="button"
          className={generalStyles.switch__btn}
        >
          Register
        </button>
      </div>
    </form>
  );
}
