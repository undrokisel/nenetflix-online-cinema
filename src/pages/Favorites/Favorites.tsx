import { MovieList } from "components";
import { searchInFavourites, useAppDispatch, useAppSelector } from "store";
import { EmptyPage, Message } from "./styles";
import { NoFavorites } from "assets";
import { useEffect } from "react";

export const Favorites = () => {
  const { favorites, searchResults } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.user,
  );

  const { searchRequest } = useAppSelector(({ persistedReducer }) => persistedReducer.search);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchRequest) {
      dispatch(searchInFavourites(searchRequest));
    }
  }, [dispatch, searchRequest]);

  if (favorites.length === 0) {
    return (
      <EmptyPage maxWidth={{ XL: "80%" }}>
        <NoFavorites width={"100%"} />
        <Message>Пока ничего не добавлено</Message>
      </EmptyPage>
    );
  }

  if (searchRequest) {
    return <MovieList movieList={searchResults} />;
  }

  return <MovieList movieList={favorites} />;
};
