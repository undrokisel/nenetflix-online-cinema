import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, resetError, signUp, 
  // updateUserName
 } from "store";
import { ROUTE } from "router";
import { IUserSignUp } from "types";
import { Color, ButtonPrimary, Space } from "ui";
import { AuthModal, CustomSpinner, ErrorMessage } from "components";
import {
  Body,
  FieldTitle,
  InputField,
  StyledForm,
  Title,
  StyledInput,
  SignIn,
  SignInLink,
  Field,
  StyledCheckbox,
  CheckBoxLabel,
} from "./styles";
import { useWindowSize } from "hooks";

export const SignUpForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserSignUp>();

  const passwordValue = watch("password", "");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { screenWidth } = useWindowSize();

  const { isLoading, isLogged, error, isLightMode } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );

  const onSubmit: SubmitHandler<IUserSignUp> = async (data) => {
    dispatch(signUp(data));
    // .then(() => {
    // !error && dispatch(updateUserName(data));
    // });
  };

  useEffect(() => {
    error && dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigate(ROUTE.HOME);
      }, 2000);
    }
  }, [isLogged, navigate]);

  return (
    <StyledForm
      position={{ S: "static" }}
      $isLightMode={isLightMode}
      width={{ S: "574px" }}
      padding={{ S: Space.L }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title $isLightMode={isLightMode}>Регистрация</Title>

      {error && <ErrorMessage message={error} />}

      <Body>
        <Field flexDirection={{ S: "row" }}>
          {/* Name */}
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Имя</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="text"
              placeholder="Ваше имя"
              {...register("name", {
                required: "введите имя",
                validate: (value) => /^[а-яА-ЯёЁ\s\-]+$/.test(value) || "по-русски",
              })}
            />
            {errors.name && errors.name.message && <ErrorMessage message={errors.name.message} />}
          </InputField>

          {/* Surname */}
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Фамилия</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="text"
              placeholder="Ваша фамилия"
              {...register("surname", {
                required: "введите фамилию",
                validate: (value) => /^[а-яА-ЯёЁ\s\-]+$/.test(value) || "по-русски",
              })}
            />
            {errors.surname && errors.surname.message && (
              <ErrorMessage message={errors.surname.message} />
            )}
          </InputField>
        </Field>

        <Field flexDirection={{ S: "row" }}>
          {/* Patronimic */}
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Patronimic</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="text"
              placeholder="Ваш patronimic"
              {...register("patronimic", {
                required: "введите патронимик",
                validate: (value) => /^[а-яА-ЯёЁ\s\-]+$/.test(value) || "по-русски",
              })}
            />
            {errors.patronimic && errors.patronimic.message && (
              <ErrorMessage message={errors.patronimic.message} />
            )}
          </InputField>

          {/* login */}
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
            {errors.login && errors.login.message && (
              <ErrorMessage message={errors.login.message} />
            )}
          </InputField>
        </Field>

        {/* email */}
        <Field flexDirection={{ S: "row" }}>
          <InputField style={{ width: `${screenWidth > 767 ? "93%" : ""}` }}>
            <FieldTitle $isLightMode={isLightMode}>Email</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="email"
              placeholder="Ваша почта"
              {...register("email", {
                required: "введите e-mail",
              })}
            />
            {errors.email && errors.email.message && (
              <ErrorMessage message={errors.email.message} />
            )}
          </InputField>
        </Field>

        <Field flexDirection={{ S: "row" }}>
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Пароль</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="password"
              placeholder="Ваш пароль"
              {...register("password", {
                required: "введите пароль",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов",
                },
              })}
            />
            {errors.password && errors.password.message && (
              <ErrorMessage message={errors.password.message} />
            )}
          </InputField>

          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Повторите пароль</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="password"
              placeholder="Подтвердите пароль"
              {...register("confirmPassword", {
                required: "подтвердите пароль",
                validate: (value) => value === passwordValue || "Ввведенные пароли не совпадают",
              })}
            />
            {errors.confirmPassword && errors.confirmPassword.message && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </InputField>
        </Field>

        {/* checkbox */}
        <div className="custom-checkbox">
          <Controller
            control={control}
            name="agreement"
            render={({ field }) => (
              <>
                <StyledCheckbox>
                  <input
                    type="checkbox"
                    id="customCheckbox"
                    checked={field.value}
                    // onChange={(e) => field.onChange(e.target.checked)}
                    {...register("agreement", {
                      required: "подтвердите согласие с правилами сервиса",
                    })}
                  />
                  <CheckBoxLabel $isLightMode={isLightMode}>
                    <label htmlFor="customCheckbox">Я согласен с правилами сервиса</label>
                  </CheckBoxLabel>
                </StyledCheckbox>

                {errors.agreement && errors.agreement.message && (
                  <ErrorMessage message={errors.agreement.message} />
                )}
              </>
            )}
          />
        </div>
      </Body>
      <ButtonPrimary type="submit">
        Зарегистрироваться&nbsp;&nbsp;
        {isLoading && <CustomSpinner color={Color.White} still={false} size="20px" />}
      </ButtonPrimary>
      <SignIn>
        Уже есть аккаунт?&nbsp;&nbsp;
        <SignInLink to={`/${ROUTE.SIGN_IN}`}>Войти</SignInLink>
      </SignIn>
      {isLogged && <AuthModal message="Успешный вход!" />}
    </StyledForm>
  );
};
