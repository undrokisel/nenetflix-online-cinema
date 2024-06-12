import { OMDbApi } from "services/OMDbApi";
import { FirebaseErrorMessage, LaravelErrorMessage, IFilters, IMovieShort } from "types";
import { Color } from "ui";

export const getRatingBadgeColor = (rating: string): Color => {
  if (Number(rating) <= 7) {
    return Color.Yellow;
  } else if (Number(rating) <= 4) {
    return Color.Orange;
  } else return Color.Green;
};

export const getShortUserName = (name: string): string => {
  return (name.charAt(0) + name.charAt(1)).toUpperCase();
};

export const getFirebaseErrorMessage = (code: string): FirebaseErrorMessage => {
  switch (code) {
    case "auth/email-already-in-use":
      return FirebaseErrorMessage.EMAIL_ALREADY_IN_USE;
    case "auth/user-not-found":
      return FirebaseErrorMessage.USER_NOT_FOUND;
    case "auth/wrong-password":
      return FirebaseErrorMessage.WRONG_PASSWORD;
    case "auth/invalid_login_credentials":
      return FirebaseErrorMessage.INVALID_LOGIN_CREDENTIALS;
    default:
      return FirebaseErrorMessage.UNKNOWN_ERROR;
  }
};

export const getLaravelErrorMessage = (code: string): LaravelErrorMessage => {
  switch (code) {
    case "The email has already been taken.":
      return LaravelErrorMessage.EMAIL_ALREADY_IN_USE;
    case "The password field must be at least 6 characters.":
      return LaravelErrorMessage.SMALL_PASSWORD;
    case "name должно содержать только кириллические буквы, пробелы и тире.":
      return LaravelErrorMessage.NAME_NON_CYRILLIC;
    case "surname должно содержать только кириллические буквы, пробелы и тире.":
      return LaravelErrorMessage.SURNAME_NON_CYRILLIC;
    case "patronimic должно содержать только кириллические буквы, пробелы и тире.":
      return LaravelErrorMessage.PATRO_NON_CYRILLIC;
    case "login должно содержать только латинские буквы, пробелы и тире.":
      return LaravelErrorMessage.LOGIN_NON_LATIN;
    case "The rules field must be accepted.":
      return LaravelErrorMessage.RUSES_NON_ACCEPTED;

    case "The login has already been taken.":
      return LaravelErrorMessage.LOGIN_ALREADY_IN_USE;

    // for sign in
    case "Invalid credentials":
      return LaravelErrorMessage.INVALID_CREDENTIALS;

    default:
      return LaravelErrorMessage.UNKNOWN_ERROR;
  }
};

export const checkIfInFavorites = (favorites: IMovieShort[], id: string): boolean => {
  return favorites.reduce(
    (isInFavorites, favorite) => (favorite.imdbID === id ? !isInFavorites : isInFavorites),
    false,
  );
};

export const checkIfInOrders = (orders: IMovieShort[], id: string): boolean => {
  return orders.reduce(
    (isInOrders, order) => (order.imdbID === id ? !isInOrders : isInOrders),
    false,
  );
};

export const checkIfInTrends = (trends: IMovieShort[], id: string): boolean => {
  return trends.reduce(
    (isInFavorites, trending) => (trending.imdbID === id ? !isInFavorites : isInFavorites),
    false,
  );
};

export const getTrendingPageTitle = (trend: string): string => {
  switch (trend) {
    case "man":
      return "Подборка лучших экшнов";
    case "star wars":
      return "Подборка саг Звездных войн";
    case "love":
      return "Чувственное кино";
    default:
      return "Трендовая подборка";
  }
};

export const sortMovieList = (filters: IFilters, movieList: IMovieShort[]): IMovieShort[] => {
  let sortedMovieList = [...movieList];

  if (filters.sortBy === "title") {
    sortedMovieList.sort((item, nextItem) => item.Title.localeCompare(nextItem.Title));
  } else if (filters.sortBy === "year") {
    sortedMovieList.sort((item, nextItem) => +nextItem.Year.slice(0, 4) - +item.Year.slice(0, 4));
  }

  if (filters.type) {
    sortedMovieList = [...sortedMovieList].filter((item) => item.Type === filters.type);
  }

  if (filters.year) {
    sortedMovieList = [...sortedMovieList].filter((item) => item.Year === filters.year);
  }
  return sortedMovieList;
};

export const getMovieRecommendation = (title: string): string => {
  const recommendation = title
    .toLowerCase()
    .match(/(?!(the|this|these|those|that|them))\b\w{3,10}\b/);

  if (recommendation) {
    return recommendation[0];
  } else return OMDbApi.trend;
};

export const toggleStateToShowModal = (cb: (bool: boolean) => void) => {
  cb(true);
  setTimeout(() => {
    cb(false);
  }, 1500);
};

export const formatDateToReadable = (dateString: string): string => {
  const date = new Date(dateString);

  const year: string | number = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  month = month < 10 ? ("0" + month).toString() : month.toString();
  day = day < 10 ? ("0" + day).toString() : day.toString();
  hours = hours < 10 ? ("0" + hours).toString() : hours.toString();
  minutes = minutes < 10 ? ("0" + minutes).toString() : minutes.toString();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;

  return formattedDate;
};



export const imaginePrice = (movieImdbRating: string): number => {
  return Math.floor(Number(movieImdbRating) * 50) | 100;
};
