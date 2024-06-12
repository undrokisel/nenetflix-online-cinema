import { IMovieShort } from "types";
import { Description, MovieTitle, Released, StyledMovieCard } from "./styles";
import { MoviePoster } from "components";
import { ROUTE } from "router";
import { useAppSelector } from "store";
import { generatePath, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface IProps {
  movie: IMovieShort;
  to?: string;
}

export const MovieListItem = ({ movie }: IProps) => {
  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const location = useLocation();
  const routes = [`${ROUTE.FAVOURITES}`, `${ROUTE.FAVOURITE_MOVIE}`];
  const isMatch = () => {
    return routes.some(
      (route) =>
        (location.pathname.slice(1).length > 0) && route.startsWith(location.pathname.slice(1)),
    );
  };
  const [isCartPage, setIsCartPage] = useState(isMatch());

  useEffect(() => {
    setIsCartPage(() => isMatch());
  }, [location]);

  return (
    <StyledMovieCard  style={{marginBottom: "4rem"}}>
      <MoviePoster poster={movie.Poster} id={movie.imdbID}></MoviePoster>
      <Description>
        <MovieTitle
          $isLightMode={isLightMode}
          to={generatePath(`/${ROUTE.MOVIE}`, { imdbID: movie.imdbID })}
        >
          {movie.Title}
        </MovieTitle>

        <Released $isLightMode={isLightMode}>{`Год: ${movie.Year.slice(0, 4)}`}</Released>

      </Description>
    </StyledMovieCard>
  );
};
