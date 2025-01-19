import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'Cars',
  subcategory: 'All',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Change the category and subcategory
    CHANGE_CATEGORY: (state, action) => {
      state.category = action.payload.category;
      state.subcategory = action.payload.subcategory;

      console.log("New Category : " ,  state.category , " New Subcategory : " ,state.subcategory  );
    },
  },
});

export const { CHANGE_CATEGORY } = categorySlice.actions;

export default categorySlice.reducer; 

