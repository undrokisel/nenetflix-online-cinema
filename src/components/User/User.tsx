import { useToggle } from "hooks";
import { useAppDispatch, useAppSelector, signUserOut } from "store";
import { Avatar, ArrowButton, DropDownContainer, Header, Button, UserBadge } from "./styles";
import { FiUser } from "react-icons/fi";
import { ROUTE } from "router";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { getShortUserName } from "utils";

export const User = () => {
  const { isLogged, name, isLightMode } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );
  const [isOpen, setIsOpen] = useToggle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <UserBadge>

      <Avatar>{name ? getShortUserName(name) : <FiUser />}</Avatar>
      
      <Header $isLightMode={isLightMode}>{name ? name : "Гость"}</Header>

      <ArrowButton onClick={setIsOpen} $isLightMode={isLightMode}>
        <IoIosArrowDown size={20} />
      </ArrowButton>
      
      {isOpen && (
        <DropDownContainer $isLightMode={isLightMode}>
          {isLogged && (
            <Button
              $isLightMode={isLightMode}
              onClick={() => {
                navigate(ROUTE.SETTINGS);
                setIsOpen();
              }}
            >
              Редактировать профиль
            </Button>
          )}
          {isLogged ? (
            <Button
              $isLightMode={isLightMode}
              onClick={() => {
                dispatch(signUserOut());
                setIsOpen();
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button
              $isLightMode={isLightMode}
              onClick={() => {
                navigate(ROUTE.SIGN_IN);
                setIsOpen();
              }}
            >
              {/* Sign In */}
              Вход
            </Button>
          )}
        </DropDownContainer>
      )}
    </UserBadge>
  );
};
