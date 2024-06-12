import { SearchSpinner, SearchError, MovieList, Footer } from "components";
import { useMemo } from "react";
import { useAppSelector, useAppDispatch, getTrends, searchTrends, resetTrendsSearch } from "store";
import { TrendingMovieList, TrendingPageTitle } from "./styles";

export const Trends = () => {
  const {
    movieList,
    requestParams,
    searchResults,
    searchParams,
    isLoading,
    error,
    disableLoader,
    trend,
  } = useAppSelector(({ persistedReducer }) => persistedReducer.trends);

  const { searchRequest } = useAppSelector(({ persistedReducer }) => persistedReducer.search);
  const { y, type, s } = searchRequest;

  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const dispatch = useAppDispatch();

  useMemo(() => {
    if (movieList.length === 0 && !isLoading) {
      dispatch(getTrends());
    }
  }, [dispatch, isLoading, movieList.length]);

  useMemo(() => {
    if (s || type || y) {
      dispatch(searchTrends({ y, type, s }));
    } else if (!s) {
      dispatch(resetTrendsSearch());
    }
  }, [dispatch, s, type, y]);

  if (isLoading) {
    return <SearchSpinner />;
  }

  if (error) {
    return <SearchError message={error as string} />;
  }
  if (searchRequest && searchResults.length ^ 0) {
    return (
      <>
        <MovieList movieList={searchResults} />
        {!disableLoader && !isLoading && <Footer requestParams={searchParams} />}
      </>
    );
  } else {
    return (
      <>
        <TrendingMovieList>
          <TrendingPageTitle $isLightMode={isLightMode} textAlign={{ XL: "left" }}>
            {trend}
          </TrendingPageTitle>
          <MovieList movieList={movieList} />
        </TrendingMovieList>
        {!disableLoader && !isLoading && <Footer requestParams={requestParams} />}
      </>
    );
  }
};
