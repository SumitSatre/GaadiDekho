import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchText: "" }, // Initial state with searchText
  reducers: {
    SET_SEARCH_TEXT: (state, action) => {
      state.searchText = action.payload; // Update search text
    },
    CLEAR_SEARCH_TEXT: (state) => {
      state.searchText = ""; // Clear search text
    },
  },
});

export const { SET_SEARCH_TEXT, CLEAR_SEARCH_TEXT } = searchSlice.actions;
export default searchSlice.reducer;
