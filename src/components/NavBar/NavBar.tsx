import { Navigation, StyledNavBar } from "./styles";
import { ROUTE } from "router";
import { CustomLink } from "components";
import { RiHome6Line } from "react-icons/ri";
import { IoMdFlame } from "react-icons/io";
import { HiBookmark } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaFortAwesome } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { useAppSelector } from "store";
import { CustomButton } from "components/CustomButton";
import { useSignOut } from "hooks";
import { Badge } from "components/Badge";
import { LiaJediOrder } from "react-icons/lia";

interface IProps {
  offset: number;
}

export const NavBar = ({ offset }: IProps) => {
  const { isLogged, favorites, orders, token } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );

  const handleSignOut = useSignOut();

  return (
    <StyledNavBar>
      <Navigation offset={offset}>
        <CustomLink to={ROUTE.HOME} text="Главная">
          <RiHome6Line />
        </CustomLink>
        <CustomLink to={ROUTE.TRENDS} text="Популярные">
          <IoMdFlame />
        </CustomLink>

        {favorites.length > 0 && (
          <CustomLink to={ROUTE.FAVOURITES} text="Корзина">
            {favorites.length > 0 ? <Badge count={favorites.length} /> : <HiBookmark />}
          </CustomLink>
        )}

        {orders.length > 0 && (
          <CustomLink to={ROUTE.ORDERS} text="Заказы">
            <LiaJediOrder />
          </CustomLink>
        )}

        {token && (
          <CustomLink to={ROUTE.SETTINGS} text="Настройки">
            <IoMdSettings />
          </CustomLink>
        )}

        <CustomLink to={ROUTE.CONTACTS} text="Где нас найти">
          <LuMapPin />
        </CustomLink>
        <CustomLink to={ROUTE.ABOUT_US} text="О нас">
          <FaFortAwesome />
        </CustomLink>

        {isLogged && (
          <CustomButton text="Выйти" onClick={handleSignOut}>
            <TbLogout2 />
          </CustomButton>
        )}

        {!isLogged && (
          <CustomLink to={ROUTE.SIGN_IN} text="Войти">
            <IoMdSettings />
          </CustomLink>
        )}
      </Navigation>
    </StyledNavBar>
  );
};
