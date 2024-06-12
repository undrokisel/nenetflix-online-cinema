import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters, IRequestParams } from "types";

interface ISearchState {
  searchRequest: IRequestParams;
  filters: IFilters;
}

const initialState: ISearchState = {
  searchRequest: {
    s: "",
    type: "",
    y: "",
  },
  filters: {
    sortBy: null,
    type: "",
    year: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchRequest: ({ searchRequest }, { payload }: PayloadAction<string>) => {
      searchRequest.s = payload;
      if (payload === "") {
        searchRequest.type = "";
        searchRequest.y = "";
      }
    },
    resetSearchSlice: ({ searchRequest, filters }) => {
      searchRequest.s = "";
      searchRequest.type = "";
      searchRequest.y = "";
      filters.sortBy = null;
      filters.type = "";
      filters.year = "";
    },
    setFilters: (
      { searchRequest, filters },
      { payload: { type, year, sortBy } }: PayloadAction<IFilters>,
    ) => {
      searchRequest.type = type;
      searchRequest.y = year;
      filters.type = type;
      filters.year = year;
      filters.sortBy = sortBy;
    },
    resetTypeFilter: ({ filters, searchRequest }) => {
      filters.type = "";
      searchRequest.type = "";
    },
    resetYearFilter: ({ filters, searchRequest }) => {
      filters.year = "";
      searchRequest.y = "";
    },
    resetSorting: ({ filters }) => {
      filters.sortBy = null;
    },
  },
});

export const {
  setSearchRequest,
  setFilters,
  resetTypeFilter,
  resetYearFilter,
  resetSorting,
  resetSearchSlice,
} = searchSlice.actions;
export default searchSlice.reducer;
