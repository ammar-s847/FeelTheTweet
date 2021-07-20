import { createSlice } from '@reduxjs/toolkit'

export const keywordSlice = createSlice({
  name: 'keywords',
  initialState: {
    data: {}
  },
  reducers: {
    add: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    updateList: (state, action) => {
      state.data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateList } = keywordSlice.actions;

export default keywordSlice.reducer;