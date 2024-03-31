import { configureStore } from '@reduxjs/toolkit';

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add reducers here if needed
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
