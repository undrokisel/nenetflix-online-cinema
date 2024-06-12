import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { OMDbApi } from "services";
import { IMovieShort, IRequestParams } from "types";

interface IMoviesState {
  movieList: IMovieShort[];
  requestParams: IRequestParams;
  searchParams: IRequestParams;
  searchResults: IMovieShort[];
  isLoading: boolean;
  error: string | null;
  disableLoader: boolean;
}

const initialState: IMoviesState = {
  movieList: [],
  requestParams: {
    apikey: "",
    s: "",
    page: "1",
  },
  searchParams: {
    apikey: "",
    s: "",
    y: "",
    type: "",
    page: "1",
  },
  searchResults: [],
  isLoading: false,
  error: null,
  disableLoader: false,
};

export const getRandomMovies = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  undefined,
  { rejectValue: string }
>("movies/getRandomMovies", async (_, { rejectWithValue }) => {
  try {
    return await OMDbApi.getRandomMovies();
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const loadMoreMovies = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  IRequestParams,
  { rejectValue: string }
>("movies/loadMoreMovies", async (requestParams, { rejectWithValue }) => {
  try {
    const {
      data: { Search },
      config: { params },
    } = await OMDbApi.loadMoreMovies(requestParams);
    return { Search, params };
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const searchMovies = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  IRequestParams,
  { rejectValue: string }
>("movies/searchMovies", async (searchRequest, { rejectWithValue }) => {
  try {
    const {
      data: { Search },
      config: { params },
    } = await OMDbApi.searchMovies(searchRequest);
    return { Search, params };
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMoviesSearch: (state) => {
      state.error = null;
      state.searchResults = [];
      state.searchParams = {
        apikey: "",
        s: "",
        page: "",
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getRandomMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.disableLoader = false;
    });
    builder.addCase(getRandomMovies.fulfilled, (state, { payload: { Search, params } }) => {
      state.isLoading = false;
      Search.forEach((movie) => state.movieList.push(movie));
      state.requestParams = params;
    });
    builder.addCase(getRandomMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
    builder.addCase(loadMoreMovies.pending, (state) => {
      state.error = null;
      state.disableLoader = false;
    });
    builder.addCase(loadMoreMovies.fulfilled, (state, { payload: { Search, params } }) => {
      if (state.searchResults.length > 0) {
        if (Search) {
          Search.forEach((movie) => state.searchResults.push(movie));
        } else {
          state.disableLoader = true;
        }
        state.searchParams = params;
      } else {
        if (Search) {
          Search.forEach((movie) => state.movieList.push(movie));
        } else {
          state.disableLoader = true;
        }
        state.requestParams = params;
      }
    });
    builder.addCase(loadMoreMovies.rejected, (state, { payload }) => {
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
    builder.addCase(searchMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.disableLoader = false;
    });
    builder.addCase(searchMovies.fulfilled, (state, { payload: { Search, params } }) => {
      state.isLoading = false;
      Search ? (state.searchResults = Search) : (state.error = "Nothing was found");
      state.searchParams = params;
    });
    builder.addCase(searchMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
  },
});

export const { resetMoviesSearch } = moviesSlice.actions;
export default moviesSlice.reducer;
