import { useAppSelector } from "store";
import { MovieListItem, SearchError } from "components";
import { StyledMovieList } from "./styles";
import { IMovieShort } from "types";
import { sortMovieList } from "utils";

interface IProps {
  movieList: IMovieShort[];
}

export const MovieList = ({ movieList }: IProps) => {
  const { filters } = useAppSelector(({ persistedReducer }) => persistedReducer.search);

  const sortedMovieList = sortMovieList(filters, movieList);

  if (sortedMovieList.length === 0) {
    return <SearchError message="Nothing fits your current selection" />;
  }
  return (
    <StyledMovieList
      gridTemplateColumns={{
        default: "1fr",
        S: "repeat(3, 1fr)",
        L: "repeat(4, 1fr)",
        XXL: "repeat(5, 1fr)",
      }}
      gridColumn={{
        XL: "2/3",
      }}
    >
      {sortedMovieList.map((movieListItem) => {
        return <MovieListItem key={movieListItem.imdbID} movie={movieListItem} />;
      })}
    </StyledMovieList>
  );
};
