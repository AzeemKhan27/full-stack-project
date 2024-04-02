
import { createSlice } from '@reduxjs/toolkit';

export const pdfModificationSlice = createSlice({
  name: 'pdfModification',
  initialState: {
    loading: false,
    error: null,
    modifiedPdf: null,
    message: '',
  },
  reducers: {
    pdfModificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.modifiedPdf = null;
      state.message = '';
    },
    pdfModificationSuccess: (state, action) => {
      state.loading = false;
      state.modifiedPdf = action.payload.modifiedPdf;
      state.message = action.payload.message;
    },
    pdfModificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.modifiedPdf = null;
      state.message = '';
    },
  },
});

export const { pdfModificationRequest, pdfModificationSuccess, pdfModificationFailure } = pdfModificationSlice.actions;

export default pdfModificationSlice.reducer;
