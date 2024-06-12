import { useSignOut, useToggle, useWindowSize } from "hooks";
import { Color, Space } from "ui";
import { slide as StyledMenu } from "react-burger-menu";
import { BurgerIcon, CrossIcon, MenuWrap, Navigation } from "./styles";
import { CustomLink } from "components";
import { RiHome6Line } from "react-icons/ri";
import { ROUTE } from "router";
import { IoMdFlame, IoMdSettings } from "react-icons/io";
import { HiBookmark } from "react-icons/hi";
import { useAppSelector } from "store";
import { LuMapPin } from "react-icons/lu";
import { FaFortAwesome } from "react-icons/fa";
import { CustomButton } from "components/CustomButton";
import { TbLogout2 } from "react-icons/tb";
import { Badge } from "components/Badge";
import { LiaJediOrder } from "react-icons/lia";

export const BurgerMenu = () => {
  const { screenWidth } = useWindowSize();
  const [isOpen, setIsOpen] = useToggle();
  const { isLightMode, isLogged, favorites, orders, token } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );

  const handleSignOut = useSignOut();

  const byrgerStyles = {
    bmBurgerButton: {
      position: "relative",
      gridCplumn: 3 / 4,
      width: "56px",
      height: "56px",
      margin: "0px 0px 0px auto",
      padding: "15px 10px",
      background: isOpen ? Color.PrimaryLight : Color.PrimaryDark,
      borderRadius: "10px",
    },
    bmCrossButton: {
      height: "56px",
      width: "56px",
      marginTop: "30px",
      padding: "15px",
      opacity: isOpen ? "1" : "0.6",
    },
    bmMenuWrap: {
      position: "fixed",
      top: "0",
      height: "100vh",
      width: `${screenWidth > 767 ? "330px" : "100vw"}`,
    },
    bmMenu: {
      display: "flex",
      background: isLightMode ? Color.White : Color.Black,
      padding: `${screenWidth > 767 ? `150px ${Space.XXL}` : `150px ${Space.M}`}`,
    },
    bmItemList: {
      display: "flex",
    },
    bmOverlay: {
      position: "fixed",
      top: "0",
      left: "0",
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <MenuWrap gridColumn={{ S: "3/4" }}>
      <StyledMenu
        right
        styles={byrgerStyles}
        customCrossIcon={<CrossIcon $isLightMode={isLightMode} />}
        customBurgerIcon={<BurgerIcon />}
        onOpen={setIsOpen}
        onClose={setIsOpen}
        isOpen={isOpen}
      >
        <Navigation onClick={setIsOpen} style={{ display: "flex" }}>
          <CustomLink to={ROUTE.HOME} text="Главная">
            <RiHome6Line />
          </CustomLink>
          <CustomLink to={ROUTE.TRENDS} text="Популярные">
            <IoMdFlame />
          </CustomLink>

          {favorites.length > 0 && (
            <CustomLink to={ROUTE.FAVOURITES} text="Корзина" count={favorites.length}>
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
              <TbLogout2 />
            </CustomLink>
          )}
        </Navigation>
      </StyledMenu>
    </MenuWrap>
  );
};
