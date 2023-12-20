import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateInterface {
  searchTerm: string;
  industry: string;
  currentPage: number;
}

const initialState: InitialStateInterface = {
  searchTerm: "",
  industry: "",
  currentPage: 1,
};

export const startupSlice = createSlice({
  name: "startup",
  initialState,
  reducers: {
    searchStartup: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload;
    },
    filterIndustry: (state, { payload }: PayloadAction<string>) => {
      state.industry = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
  },
});

export const { searchStartup, filterIndustry, setCurrentPage } =
  startupSlice.actions;

export default startupSlice.reducer;
