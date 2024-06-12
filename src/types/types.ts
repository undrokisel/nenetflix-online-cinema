import { ROUTE } from "router";

export interface SignUpResponse {
  message: string;
  status: number;
}

export interface SignInResponse {
  login: string;
  password: string;
  token: string;
  name: string;
  surname: string;
  patronimic: string;
  email: string;
  is_admin: boolean;
}

export enum Param {
  ApiKey = "apikey",
  Id = "i",
  Title = "t",
  Type = "type",
  Year = "y",
  Plot = "plot",
  Search = "s",
  Page = "page",
}

export enum MovieType {
  // Movie = "movie",
  // Series = "series",
  // Episode = "episode",
  Movie = "фильм",
  Series = "сериал",
  Episode = "эпизод",

}

export interface IMovieFull {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Response: string;
}

export interface IMovieShort extends Record<string, any> {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IMovieListItem {
  poster: string;
  title: string;
  genres: string[];
  rating: string;
  imdbID: string;
}

export interface IMovieRating {
  Source: string;
  Value: string;
}

export interface IMovieCard {
  title: string;
  year: string;
  released: string;
  runtime: string;
  genres: string[];
  director: string;
  writers: string;
  actors: string;
  plot: string;
  country: string;
  poster: string;
  imdbRating: string;
  imdbID: string;
  type: string;
  boxOffice: string;
  production: string;
}

export interface IMovieFactsList {
  Год: string;
  Релиз: string;
  Сборы: string;
  Страна: string;
  Производство: string;
  Актеры: string;
  Режиссер: string;
  Сценаристы: string;
}

export type RouteType =
  | [ROUTE.HOME]
  | [ROUTE, { imdbID: string }]
  | [ROUTE.TRENDS]
  | [ROUTE.FAVOURITES]
  | [ROUTE.SETTINGS]
  | [ROUTE.SIGN_IN]
  | [ROUTE.SIGN_UP]
  | [ROUTE.RESET_PASSWORD];

export interface IRequestParams {
  apikey?: string | undefined;
  s: string;
  page?: string;
  y?: string;
  type?: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
  token?: string;
}

export interface IUserSignUp {
  name: string;
  surname: string;
  patronimic: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;

  agreement: boolean;
}

export enum FirebaseErrorMessage {
  EMAIL_ALREADY_IN_USE = "Указанный email уже используется ранее зарегистрированным пользователем",
  USER_NOT_FOUND = "Пользователь с таким email не найден ",
  UNKNOWN_ERROR = "Что-то пошло не так, попробуйте еще раз",
  WRONG_PASSWORD = "Пароль не подходит",

  INVALID_LOGIN_CREDENTIALS = "Такого email найдено",
}

export enum LaravelErrorMessage {
  EMAIL_ALREADY_IN_USE = "Указанный email уже используется ранее зарегистрированным пользователем",
  SMALL_PASSWORD = "Пароль должен быть минимум 6 символов",
  UNKNOWN_ERROR = "Что-то пошло не так, попробуйте еще раз",
  NAME_NON_CYRILLIC = "Имя должно содержать только кириллические буквы, пробелы и тире.",
  SURNAME_NON_CYRILLIC = "Фамилия должна содержать только кириллические буквы, пробелы и тире.",
  PATRO_NON_CYRILLIC = "Патронимик должен содержать только кириллические буквы, пробелы и тире.",
  LOGIN_NON_LATIN = "Логин должен содержать только латинские буквы, пробелы и тире.",
  LOGIN_ALREADY_IN_USE = "Логин должен уже занят",
  
  
  RUSES_NON_ACCEPTED = "Необходимо согласиться с правилами сервиса",
  INVALID_CREDENTIALS = "Неверные данные для авторизации",
}

export interface ISettings {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  isLightMode: boolean;
}

export type MovieTypeOption = {
  value: MovieType | "";
  label: "фильм" | "сериал" | "эпизод" | "все";
};

export interface IFilters {
  sortBy: "year" | "title" | null;
  type: "movie" | "series" | "episode" | "";
  year: string | "";
}
