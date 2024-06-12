import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  // useAppDispatch,
  useAppSelector,
  // resetError,
} from "store";
import { ROUTE } from "router";
import { ButtonPrimary, Color, Space } from "ui";
import { AuthModal, CustomSpinner, 
  // ErrorMessage 
} from "components";
import { Body, FieldTitle, InputField, StyledInput, StyledForm, Title, Error } from "./styles";

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const {
    isLoading,
    // error,
    isLightMode,
  } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    // dispatch(resetPassword(data));
    setIsPasswordReset(true);
  };

  // useEffect(() => {
  // error && dispatch(resetError());
  // }, [dispatch, error]);

  useEffect(() => {
    isPasswordReset &&
      setTimeout(() => {
        navigate(`/${ROUTE.SIGN_IN}`);
        // dispatch(resetPasswordState());
      }, 2000);
  }, [
    // dispatch,
    isPasswordReset,
    navigate,
  ]);

  return (
    <StyledForm
      $isLightMode={isLightMode}
      width={{ S: "574px" }}
      padding={{ S: Space.L }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title $isLightMode={isLightMode}>Восстановление пароля</Title>

      {/* {error && <ErrorMessage message={error} />} */}

      <Body>
        <InputField>
          <FieldTitle $isLightMode={isLightMode}>Email</FieldTitle>
          <StyledInput
            $isLightMode={isLightMode}
            type="email"
            placeholder="Ваш Email"
            {...register("email", { required: "Введите корректный e-mail" })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputField>
      </Body>

      <ButtonPrimary type="submit">
        Сбросить&nbsp;&nbsp;
        {isLoading && <CustomSpinner color={Color.White} still={false} size="20px" />}
      </ButtonPrimary>

      {isPasswordReset && (
        <AuthModal message="На вашу почту выслана ссылка для восстановления пароля" />
      )}
    </StyledForm>
  );
};
