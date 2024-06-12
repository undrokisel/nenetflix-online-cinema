import { useMemo } from "react";
import { useDebounce, useInput } from "hooks";
import {
  useAppDispatch,
  useAppSelector,
  setSearchRequest,
  resetSearchSlice,
  resetTrendsSearch,
  resetMoviesSearch,
} from "store";
import { SearchFilters } from "components";
import { StyledInput, StyledSearchBar } from "./styles";
import { useLocation } from "react-router-dom";

export const SearchBar = () => {
  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  const movies = useAppSelector(({ persistedReducer }) => persistedReducer.movies);
  const trends = useAppSelector(({ persistedReducer }) => persistedReducer.trends);
  const { pathname } = useLocation();
  const { value, onChange, setInputValue } = useInput();
  const searchRequestValue = useDebounce(value, 1000);
  const dispatch = useAppDispatch();

  const isError = !!movies.error || !!trends.error;

  useMemo(() => {
    if (pathname) {
      dispatch(resetSearchSlice());
      setInputValue("");
      dispatch(resetTrendsSearch());
      dispatch(resetMoviesSearch());
    }
  }, [dispatch, pathname, setInputValue]);

  useMemo(() => {
    dispatch(setSearchRequest(searchRequestValue));
  }, [dispatch, searchRequestValue]);

  return (
    <StyledSearchBar
      gridColumn={{
        S: "2/3",
      }}
      gridRow={{
        S: "1/2",
      }}
    >
      <StyledInput
        $isLightMode={isLightMode}
        $isError={isError}
        type="text"
        // placeholder="Search"
        placeholder="Искать"
        value={value}
        onChange={onChange}
      />
      <SearchFilters />
    </StyledSearchBar>
  );
};
