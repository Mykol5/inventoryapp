import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

// Configure the Redux store with the product slice reducer
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

// Define RootState type as the return type of store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type as the store's dispatch type
export type AppDispatch = typeof store.dispatch;

// Export the configured store as the default export
export default store;
