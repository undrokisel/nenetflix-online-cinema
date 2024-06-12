import { MainTemplate, AuthTemplate, RequireAuth } from "components";
import {
  Home,
  Trends,
  NotFound,
  Favorites,
  Settings,
  SignUp,
  SignIn,
  ResetPassword,
  Movie,
  Orders,
} from "pages";
import { Routes, Route } from "react-router-dom";
import { ROUTE } from "./routes";
import { About } from "components/About";
import { InformTemplate } from "components/InformTemplate";
import { Contacts } from "components/Contacts";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<MainTemplate />}>
        <Route index element={<Home />} />
        <Route path={ROUTE.MOVIE} element={<Movie />} />
        <Route path={ROUTE.TRENDS} element={<Trends />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<RequireAuth />}>
          <Route path={ROUTE.FAVOURITES} element={<Favorites />} />
          <Route path={ROUTE.ORDERS} element={<Orders />} />
          <Route path={ROUTE.FAVOURITE_MOVIE} element={<Movie />} />
          <Route path={ROUTE.TRENDING_MOVIE} element={<Movie />} />
          <Route path={ROUTE.SETTINGS} element={<Settings />} />
        </Route>
      </Route>

      <Route path={ROUTE.HOME} element={<AuthTemplate />}>
        <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTE.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTE.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>

      <Route path={ROUTE.HOME} element={<InformTemplate />}>
        <Route path={ROUTE.CONTACTS} element={<Contacts />} />
        <Route path={ROUTE.ABOUT_US} element={<About/>} />
      </Route>
    </Routes>
  );
};
