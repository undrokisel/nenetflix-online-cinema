import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "store";
import { ROUTE } from "router";

export const RequireAuth = () => {
  const { isLogged } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  return isLogged ? <Outlet /> : <Navigate to={ROUTE.SIGN_IN} />;
};
