import { SearchSpinner, SearchError, MovieCard, Recommendations } from "components";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch, getMovieById } from "store";

export const Movie = () => {
  const { isLoading, error, movieCard, movieFacts } = useAppSelector(
    ({ persistedReducer }) => persistedReducer.movie,
  );

  const dispatch = useAppDispatch();

  const { imdbID } = useParams<{ imdbID: string }>();

  useMemo(() => {
    if (imdbID) {
      dispatch(getMovieById(imdbID));
    }
  }, [dispatch, imdbID]);

  if (isLoading) {
    return <SearchSpinner />;
  }

  if (error) {
    return <SearchError message={error} />;
  }

  return (
    movieCard &&
    movieFacts && (
      <>
        <MovieCard movie={movieCard} movieFactsList={movieFacts} />
        <Recommendations />
      </>
    )
  );
};
