import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  reauthentificate,
  toggleColorMode,
  updateUserCredentials,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "store";
import { ISettings } from "types";
import { Color } from "ui";
import { CustomSpinner, ErrorMessage } from "components";
import Switch from "react-switch";
import {
  Body,
  Cancel,
  Control,
  Field,
  FieldDescription,
  FieldTitle,
  InputField,
  Save,
  StyledForm,
  StyledInput,
  Title,
} from "./styles";

export const SettingsForm = () => {
  const {
    watch,
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ISettings>();
  const newPasswordValue = watch("newPassword", "");

  const { name, email, isLoading, error, isLightMode } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const onSumbit: SubmitHandler<ISettings> = (data) => {
    dispatch(reauthentificate(data))
      .unwrap()
      .then(() => dispatch(updateUserName(data)).unwrap())
      .then(() => dispatch(updateUserEmail(data)).unwrap())
      .then(() => dispatch(updateUserPassword(data)).unwrap())
      .then(() => dispatch(updateUserCredentials()))
      .then(() => dispatch(toggleColorMode(data.isLightMode)))
      .finally(() => {
        resetField("password");
        resetField("newPassword");
        resetField("confirmPassword");
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSumbit)}>
      <Field>
        <Title $isLightMode={isLightMode}>Профиль</Title>
        <Body $isLightMode={isLightMode}>
          {/* Имя */}
          <InputField maxWidth={{ S: "45%" }}>
            <FieldTitle $isLightMode={isLightMode}>Имя</FieldTitle>

            <StyledInput
              $isLightMode={isLightMode}
              type="text"
              placeholder="Ваше имя"
              {...register("name", {
                required: "введите имя",
                value: name as string,
              })}
            />
            {errors.name && errors.name.message && <ErrorMessage message={errors.name.message} />}
          </InputField>

          {/* email */}
          <InputField width={{ S: "45%" }}>
            <FieldTitle $isLightMode={isLightMode}>Email</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="email"
              placeholder="Ваш Email"
              {...register("email", {
                required: "введите корректный e-mail",
                value: email as string,
              })}
            />
            {errors.email && errors.email.message && (
              <ErrorMessage message={errors.email.message} />
            )}
          </InputField>
        </Body>
      </Field>
      <Field>
        <Title $isLightMode={isLightMode}>Пароль</Title>
        <Body $isLightMode={isLightMode}>
          <InputField width={{ S: "45%" }}>
            <FieldTitle $isLightMode={isLightMode}>Пароль</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "введите корректный пароль",
              })}
            />
            {errors.password && errors.password.message && (
              <ErrorMessage message={errors.password.message} />
            )}
          </InputField>
          <InputField width={{ S: "45%" }}>
            <FieldTitle $isLightMode={isLightMode}>Новый пароль</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="password"
              placeholder="Новый пароль"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "Длина пароля должна быть не менее 6 символов",
                },
              })}
            />
            {errors.newPassword && errors.newPassword.message && (
              <ErrorMessage message={errors.newPassword.message} />
            )}
          </InputField>
          <InputField width={{ S: "45%" }} margin="0 0 0 auto">
            <FieldTitle $isLightMode={isLightMode}>Повторить пароль</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="password"
              placeholder="Повторите пароль"
              {...register("confirmPassword", {
                validate: (value) => value === newPasswordValue || "Пароли не совпадают",
              })}
            />
            {errors.confirmPassword && errors.confirmPassword.message && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )}
          </InputField>
        </Body>
      </Field>
      <Field>
        <Title $isLightMode={isLightMode}>Цветовая схема</Title>
        <Body $isLightMode={isLightMode} justifyContent="space-between" alignItems="center">
          <InputField width="120px">
            <FieldTitle $isLightMode={isLightMode}>Light</FieldTitle>
            <FieldDescription $isLightMode={isLightMode}>
              Использовать светлую тему
            </FieldDescription>
          </InputField>
          <Controller
            control={control}
            name="isLightMode"
            render={({ field: { onChange, value = isLightMode } }) => (
              <Switch
                onChange={onChange}
                checked={value}
                onColor={Color.PrimaryDark}
                offColor={Color.Secondary}
              />
            )}
          />
        </Body>
      </Field>
      {error && <ErrorMessage message={error} />}
      <Control>
        <Cancel
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Отменить
        </Cancel>
        <Save type="submit">
          Сохранить&nbsp;&nbsp;
          {isLoading && <CustomSpinner color={Color.White} still={false} size="20px" />}
        </Save>
      </Control>
    </StyledForm>
  );
};
