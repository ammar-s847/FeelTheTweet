import { createSlice } from '@reduxjs/toolkit'

export const keywordSlice = createSlice({
  name: 'keywords',
  initialState: {
    data: {}
  },
  reducers: {
    updateList: (state, action) => {
      state.data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateList } = keywordSlice.actions;

export default keywordSlice.reducer;