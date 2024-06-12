import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { OMDbApi } from "services";
import { IMovieShort, IRequestParams } from "types";
import { getTrendingPageTitle } from "utils";

interface ITrendsState {
  trend: string | null;
  movieList: IMovieShort[];
  requestParams: IRequestParams;
  searchParams: IRequestParams;
  searchResults: IMovieShort[];
  isLoading: boolean;
  error: string | null;
  disableLoader: boolean;
}

const initialState: ITrendsState = {
  trend: null,
  movieList: [],
  requestParams: {
    apikey: "",
    s: "",
    page: "",
    y: "",
  },
  searchParams: {
    apikey: "",
    s: "",
    page: "",
  },
  searchResults: [],
  isLoading: false,
  error: null,
  disableLoader: false,
};

export const getTrends = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  undefined,
  { rejectValue: string }
>("trends/getTrends", async (_, { rejectWithValue }) => {
  try {
    return await OMDbApi.getTrends();
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const loadMoreTrends = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  IRequestParams,
  { rejectValue: string }
>("movies/loadMoreTrends", async (requestParams, { rejectWithValue }) => {
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

export const searchTrends = createAsyncThunk<
  { Search: IMovieShort[]; params: IRequestParams },
  IRequestParams,
  { rejectValue: string }
>("movies/searchTrends", async (searchRequest, { rejectWithValue }) => {
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

export const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {
    resetTrendsSearch: (state) => {
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
    builder.addCase(getTrends.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.disableLoader = false;
      state.trend = null;
    });
    builder.addCase(getTrends.fulfilled, (state, { payload: { Search, params } }) => {
      state.isLoading = false;
      Search.forEach((movie) => state.movieList.push(movie));
      state.requestParams = params;
      state.trend = getTrendingPageTitle(OMDbApi.trend);
    });
    builder.addCase(getTrends.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
    builder.addCase(loadMoreTrends.pending, (state) => {
      state.error = null;
      state.disableLoader = false;
    });
    builder.addCase(loadMoreTrends.fulfilled, (state, { payload: { Search, params } }) => {
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
    builder.addCase(loadMoreTrends.rejected, (state, { payload }) => {
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
    builder.addCase(searchTrends.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.disableLoader = false;
    });
    builder.addCase(searchTrends.fulfilled, (state, { payload: { Search, params } }) => {
      state.isLoading = false;
      Search ? (state.searchResults = Search) : (state.error = "Nothing was found");
      state.searchParams = params;
    });
    builder.addCase(searchTrends.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload ? payload : state.error;
      state.disableLoader = true;
    });
  },
});

export const { resetTrendsSearch } = trendsSlice.actions;
export default trendsSlice.reducer;
