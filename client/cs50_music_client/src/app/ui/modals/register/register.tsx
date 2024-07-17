import styles from "./register.module.css";
import generalStyles from "../modal.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { colors } from "../../colors";
import { registerUser } from "@/app/lib/data";
import Icon from "../../icon";

interface IRegisterProps {
  onClose: () => void;
  switchType: (r: boolean) => void;
}

export default function Register({ onClose, switchType }: IRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", shouldUnregister: true });

  const mutation: UseMutationResult<AxiosResponse, AxiosError, FieldValues> =
    useMutation({
      mutationFn: registerUser,
      onSuccess: () => switchType(true),
    });

  return (
    <form
      method="POST"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className={styles.content}
    >
      <h2 className={generalStyles.title}>Register</h2>
      {mutation.isError ? (
        <p
          className={`${generalStyles.error__block} ${generalStyles.mutation__error}`}
        >
          {mutation.error.response?.status === 400
            ? "User with such username already exists"
            : mutation.error.message}
        </p>
      ) : null}
      <label className={generalStyles.label} htmlFor="registerUsername">
        Username:
      </label>
      <input
        {...register("registerUsername", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        key="register-username"
        name="registerUsername"
        id="registerUsername"
        className={generalStyles.input}
      />
      {errors.registerUsername && (
        <p className={generalStyles.error__block}>
          {errors.registerUsername.type === "minLength"
            ? "Username must be at least 5 characters in length"
            : errors.registerUsername.type === "maxLength"
            ? "Username must be at max 150 characters in length"
            : "Username is required"}
        </p>
      )}

      <label className={generalStyles.label} htmlFor="registerPassword">
        Password:
      </label>
      <input
        {...register("registerPassword", {
          required: true,
          minLength: 5,
          maxLength: 150,
        })}
        key="register-password"
        name="registerPassword"
        id="registerPassword"
        className={generalStyles.input}
        type="password"
      />
      {errors.registerPassword && (
        <p className={generalStyles.error__block}>
          {errors.registerPassword.type === "minLength"
            ? "Password must be at least 5 characters in length"
            : errors.registerPassword.type === "maxLength"
            ? "Password must be at max 150 characters in length"
            : "Password is required"}
        </p>
      )}

      <label className={generalStyles.label} htmlFor="registerRepeat">
        Repeat password:
      </label>
      <input
        {...register("registerRepeat", {
          required: true,
          validate: (value, formValues) =>
            value === formValues.registerPassword,
        })}
        className={generalStyles.input}
        key="register-repeat"
        id="registerRepeat"
        type="password"
        name="registerRepeat"
      />
      {errors.registerRepeat && (
        <p className={generalStyles.error__block}>
          {errors.registerRepeat.type === "required"
            ? "Password must be at least 5 characters in length"
            : "Passwords don't match"}
        </p>
      )}
      <div className={generalStyles.submit__block}>
        <button
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
          onClick={() => {
            mutation.reset();
            switchType(false);
          }}
          type="button"
          className={styles.switch__btn}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
