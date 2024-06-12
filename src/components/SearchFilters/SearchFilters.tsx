import { useToggle, useWindowSize } from "hooks";
import { Color, Space } from "ui";
import { slide as StyledMenu } from "react-burger-menu";
import { CrossIcon, FilterIcon, MenuWrap } from "./styles";
import { FiltersForm } from "components";
import { useAppSelector } from "store";

export const SearchFilters = () => {
  const { screenWidth } = useWindowSize();
  const [isOpen, setIsOpen] = useToggle();
  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const styles = {
    bmBurgerButton: {
      position: "relative",
      width: "56px",
      height: "56px",
      padding: "15px 10px",
      background: "transparent",
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
      width: `${screenWidth > 767 ? "518px" : "100vw"}`,
    },
    bmMenu: {
      display: "flex",
      padding: `${screenWidth > 767 ? `50px ${Space.S}` : `50px ${Space.S}`}`,
      background: isLightMode ? Color.White : Color.Black,
    },
    bmItemList: {
      display: "flex",
      width: "100%",
      maxHeight: "90%",
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
        styles={styles}
        customCrossIcon={<CrossIcon $isLightMode={isLightMode} />}
        customBurgerIcon={<FilterIcon />}
        onOpen={setIsOpen}
        onClose={setIsOpen}
        isOpen={isOpen}
      >
        <FiltersForm setIsOpen={setIsOpen} />
      </StyledMenu>
    </MenuWrap>
  );
};
