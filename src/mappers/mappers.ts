import { IMovieCard, IMovieFactsList, IMovieFull, IMovieListItem, IMovieShort } from "types";

export const getShortMovieDescription = ({
  Poster,
  Title,
  Genre,
  imdbRating,
  imdbID,
}: IMovieFull): IMovieListItem => {
  return {
    poster: Poster,
    title: Title,
    genres: Genre.split(", "),
    rating: imdbRating,
    imdbID: imdbID,
  };
};

export const getMovieCardInfo = ({
  Title,
  Year,
  Released,
  Runtime,
  Genre,
  Director,
  Writer,
  Actors,
  Plot,
  Country,
  Poster,
  imdbRating,
  imdbID,
  Type,
  BoxOffice,
  Production,
}: IMovieFull): IMovieCard => {
  return {
    title: Title,
    year: Year,
    released: Released,
    runtime: Runtime,
    genres: Genre.split(", "),
    director: Director,
    writers: Writer,
    actors: Actors,
    plot: Plot,
    country: Country,
    poster: Poster,
    imdbRating: imdbRating,
    imdbID: imdbID,
    type: Type,
    boxOffice: BoxOffice,
    production: Production,
  };
};

export const getMovieFacts = ({
  year,
  released,
  boxOffice,
  country,
  production,
  actors,
  director,
  writers,
}: IMovieCard): IMovieFactsList => {
  return {
    "Год": year,
    "Релиз": released,
    "Сборы": boxOffice,
    "Страна": country,
    "Производство": production,
    "Актеры": actors,
    "Режиссер": director,
    "Сценаристы": writers,
  };
};

export const transformForFavorites = ({
  poster,
  title,
  type,
  year,
  imdbID,
}: IMovieCard): IMovieShort => {
  return {
    Poster: poster,
    Title: title,
    Type: type,
    Year: year,
    imdbID: imdbID,
  };
};
