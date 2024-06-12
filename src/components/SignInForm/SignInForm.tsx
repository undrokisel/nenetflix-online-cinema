import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, resetError, signIn, signUserOut } from "store";
import { ROUTE } from "router";
import { IUserSignIn } from "types";
import { Color, ButtonPrimary, Space } from "ui";
import { AuthModal, CustomSpinner, ErrorMessage } from "components";
import {
  Body,
  FieldTitle,
  InputField,
  StyledInput,
  ResetPassword,
  SignUp,
  SignUpLink,
  StyledForm,
  Title,
} from "./styles";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserSignIn>();

  const dispatch = useAppDispatch();
  const { isLogged, isLoading, error, isLightMode, is_admin } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUserSignIn> = (data) => {
    dispatch(signIn(data));
  };

  useEffect(() => {
    error && dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    isLogged &&
      is_admin &&
      setTimeout(async () => {
        await dispatch(signUserOut());
        window.location.href = process.env.REACT_APP_API_BASE_URL + "admin";
      }, 1000);
  }, [is_admin, isLogged]);

  useEffect(() => {
    isLogged &&
      !is_admin &&
      setTimeout(() => {
        navigate(ROUTE.HOME);
      }, 2000);
  }, [isLogged, navigate, is_admin]);

  return (
    <StyledForm
      width={{ S: "574px" }}
      padding={{ S: Space.L }}
      onSubmit={handleSubmit(onSubmit)}
      $isLightMode={isLightMode}
    >
      <Title $isLightMode={isLightMode}>Вход</Title>
      {error && <ErrorMessage message={error} />}
      <Body>
        <InputField>
          <FieldTitle $isLightMode={isLightMode}>Логин</FieldTitle>
          <StyledInput
            $isLightMode={isLightMode}
            type="text"
            placeholder="Ваш логин"
            {...register("login", {
              required: "введите логин",
              validate: (value) => /^[a-zA-Z\s\-]+$/.test(value) || "на латинице",
            })}
          />
          {errors.login && errors.login.message && <ErrorMessage message={errors.login.message} />}
        </InputField>
        <InputField>
          <FieldTitle $isLightMode={isLightMode}>Пароль</FieldTitle>
          <StyledInput
            $isLightMode={isLightMode}
            type="password"
            placeholder="Ваш пароль"
            {...register("password", {
              required: "введите пароль",
              minLength: {
                value: 5,
                message: "Пароль должен быть не менее 6 символов",
              },
            })}
          />
          {errors.password && errors.password.message && (
            <ErrorMessage message={errors.password.message} />
          )}
          <ResetPassword to={`/${ROUTE.RESET_PASSWORD}`}>Забыли пароль?</ResetPassword>
        </InputField>
      </Body>
      <ButtonPrimary type="submit">
        Войти&nbsp;&nbsp;
        {isLoading && <CustomSpinner color={Color.White} still={false} size="20px" />}
      </ButtonPrimary>
      <SignUp>
        Еще не аккаунта?&nbsp;&nbsp;
        <SignUpLink to={`/${ROUTE.SIGN_UP}`}>Зарегистрироваться</SignUpLink>
      </SignUp>
      {isLogged && <AuthModal message="Успешная авторизация!" />}
    </StyledForm>
  );
};
