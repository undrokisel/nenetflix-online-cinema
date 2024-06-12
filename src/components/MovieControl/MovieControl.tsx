import { BsFillShareFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector, addToFavorites } from "store";
import { IMovieCard } from "types";
import { Container, ControlButton } from "./styles";
import { checkIfInFavorites, toggleStateToShowModal, checkIfInOrders } from "utils";
import { transformForFavorites } from "mappers";

import { AuthModal } from "components";
import { useState } from "react";
import { createOrder, removeFromCart, removeFromOrders } from "store/slices/userSlice";

interface IProps {
  movie: IMovieCard;
  price?: number;
}

export const MovieControl = ({ movie, price }: IProps) => {
  const dispatch = useAppDispatch();
  const { favorites, token, orders } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );
  const forFavourites = transformForFavorites(movie);
  const isInFavorites = checkIfInFavorites(favorites, movie.imdbID);
  const isInOrdes = checkIfInOrders(orders, movie.imdbID);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isRemovedFromCart, setIsRemovedFromCart] = useState(false);
  const [isRemovedFromOrders, setIsRemovedFromOrders] = useState(false);
  const [showModalBought, setShowModalBought] = useState(false);

  const handleAddToCart = async () => {
    if (!token) {
      toggleStateToShowModal(setShowAuthModal);
    } else {
      try {
        dispatch(addToFavorites({ forFavourites, token: token }));
        toggleStateToShowModal(setIsAddedToCart);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleRemoveFromCart = async () => {
    if (!token) return;
    try {
      dispatch(removeFromCart({ imdbID: movie.imdbID, token: token }));
      toggleStateToShowModal(setIsRemovedFromCart);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFromOrders = async () => {
    if (!token) return;
    try {
      dispatch(removeFromOrders({ imdbID: movie.imdbID, token: token }));
      toggleStateToShowModal(setIsRemovedFromOrders);
    } catch (e) {
      console.error(e);
    }
  };

  const onhandleBuy = async () => {
    if (!token) return;
    try {
      await dispatch(createOrder({ forFavourites, token, price }));
      await dispatch(removeFromCart({ imdbID: movie.imdbID, token: token }));
      toggleStateToShowModal(setShowModalBought);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container>
        {showAuthModal && <AuthModal message="Сначала необходимо авторизоваться" />}
        {isAddedToCart && <AuthModal message="Фильм добавлен в корзину" />}
        {isRemovedFromCart && <AuthModal message="Фильм удален из корзины" />}
        {isRemovedFromOrders && <AuthModal message="Фильм удален из заказов" />}
        {showModalBought && <AuthModal message="Ссылка для оплаты направлена Вам на почту" />}

        {isInFavorites ? (
          <ControlButton onClick={onhandleBuy}>Купить за {price} руб.</ControlButton>
        ) : (
          <ControlButton>
            <BsFillShareFill size={20} />
          </ControlButton>
        )}
      </Container>

      <Container>
        {isInFavorites ? (
          <ControlButton onClick={handleRemoveFromCart}>Удалить из корзины</ControlButton>
        ) : isInOrdes ? (
          <ControlButton onClick={handleRemoveFromOrders}>Удалить из заказов</ControlButton>
        ) : (
          <ControlButton onClick={handleAddToCart}>В корзину</ControlButton>
        )}
      </Container>
    </>
  );
};
