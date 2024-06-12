import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getMovieCardInfo, getMovieFacts } from "mappers";
import { OMDbApi } from "services";
import { IMovieCard, IMovieFactsList, IMovieFull, IMovieShort } from "types";
import { getMovieRecommendation } from "utils";

interface IMovie {
  movieCard: IMovieCard | null;
  movieFacts: IMovieFactsList | null;
  recommendation: {
    searchQuerry: string;
    type: string;
  };
  recommendedMovies: IMovieShort[];
  areRecommendationsLoading: boolean;
  isLoading: boolean;
  error: string | null;
  recommendationsError: string | null;
}

const initialState: IMovie = {
  movieCard: null,
  movieFacts: null,
  recommendation: {
    searchQuerry: "",
    type: "",
  },
  recommendedMovies: [],
  areRecommendationsLoading: false,
  isLoading: false,
  error: null,
  recommendationsError: null,
};

export const getMovieById = createAsyncThunk<IMovieFull, string, { rejectValue: string }>(
  "movie/getMovieById",
  async (id, { rejectWithValue }) => {
    try {
      return await OMDbApi.getMovieById(id);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  },
);

export const getRecommendations = createAsyncThunk<
  IMovieShort[],
  { searchQuerry: string; type: string },
  { rejectValue: string }
>("movie/getRecommendations", async ({ searchQuerry, type }, { rejectWithValue }) => {
  try {
    return await OMDbApi.getRecommendations(searchQuerry, type);
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message);
  }
});

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMovieById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.recommendedMovies = [];
    });
    builder.addCase(getMovieById.fulfilled, (state, { payload }) => {
      state.movieCard = getMovieCardInfo(payload);
      state.movieFacts = getMovieFacts(state.movieCard);
      state.recommendation = {
        searchQuerry: getMovieRecommendation(state.movieCard.title),
        type: state.movieCard.type,
      };
      state.isLoading = false;
    });
    builder.addCase(getMovieById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
    builder.addCase(getRecommendations.pending, (state) => {
      state.areRecommendationsLoading = true;
      state.recommendationsError = null;
    });
    builder.addCase(getRecommendations.fulfilled, (state, { payload }) => {
      state.recommendedMovies = payload;
      state.areRecommendationsLoading = false;
    });
    builder.addCase(getRecommendations.rejected, (state, { payload }) => {
      state.areRecommendationsLoading = false;
      state.recommendationsError = payload as string;
    });
  },
});

export default movieSlice.reducer;
