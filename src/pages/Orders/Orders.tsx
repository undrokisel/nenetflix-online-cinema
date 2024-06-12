import { AuthModal } from "components";
import { EmptyPage, Message } from "./styles";
import { NoFavorites } from "assets";
import { ResponsiveTable } from "components/ResponsiveTable";
import { useAppDispatch, useAppSelector } from "store";
import { IOrderItem, removeFromOrders } from "store/slices/userSlice";
import { toggleStateToShowModal } from "utils";
import { useState } from "react";

export const Orders = () => {
  const { orders, token } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  const dispatch = useAppDispatch();
  const [isRemovedFromOrders, setIsRemovedFromOrders] = useState(false);

  const customHeadersMapper = {
    Title: "Название",
    Type: "Тип",
    Year: "Год",
    created_at: "Дата заказа",
    Price: "Цена",
    Status: "Статус",
  };

  if (orders.length === 0) {
    return (
      <EmptyPage maxWidth={{ XL: "80%" }}>
        <NoFavorites width={"100%"} />
        <Message>Пока заказов нет</Message>
      </EmptyPage>
    );
  }

  const handleToDelete = async (value: string) => {
    if (!token) {
      return;
    }
    try {
      await dispatch(removeFromOrders({ imdbID: value, token: token }));
      toggleStateToShowModal(setIsRemovedFromOrders);
    } catch (e) {
      console.error(e);
    }
  };

  const actionHandlers = [
    ["imdbID", handleToDelete, "Удалить"] as [
      keyof IOrderItem,
      (value: string) => Promise<void>,
      string,
    ],
  ];
  return (
    <>
      {isRemovedFromOrders && <AuthModal message="Фильм удален из списка заказов" />}

      <ResponsiveTable
        collection={orders}
        customHeadersMapper={customHeadersMapper}
        actionHandlers={actionHandlers}
      />
    </>
  );
};
