import { configureStore } from '@reduxjs/toolkit';
import keywordsReducer from './keywords-state';

export const store = configureStore({
  reducer: {
    keywords: keywordsReducer
  },
});