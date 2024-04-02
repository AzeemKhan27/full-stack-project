import { configureStore } from '@reduxjs/toolkit';
import pdfModificationReducer from '../features/pdfModification/pdfModificationSlice';

const store = configureStore({
  reducer: {
    pdfModification: pdfModificationReducer,
  },
});

export default store;