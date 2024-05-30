import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

// Define the initial state interface for the slice
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct?: Product; // Optional property for a single selected product
}

// Initial state for the product slice
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://inventory.free.beeceptor.com/api/inventory/${id}`);
      return response.data;
    } catch (error) {
      // Return an error message if the request fails
      return rejectWithValue('Failed to fetch product by ID');
    }
  }
);

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://inventory.free.beeceptor.com/api/inventory');
  return response.data;
});

// Async thunk to add a new product
export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
  const response = await axios.post('https://inventory.free.beeceptor.com/api/inventory', product);
  return response.data;
});

// Async thunk to update an existing product
export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
  const response = await axios.put(`https://inventory.free.beeceptor.com/api/inventory/${product.id}`, product);
  return response.data;
});

// Async thunk to delete a product by ID
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await axios.delete(`https://inventory.free.beeceptor.com/api/inventory/${id}`);
  return id;
});

// Create the product slice
const productSlice = createSlice({
  name: 'products', // Name of the slice
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Set loading to true when fetching products
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload; // Update state with fetched products
        state.loading = false; // Set loading to false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products'; // Set error message
        state.loading = false; // Set loading to false
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload); // Add the new product to the state
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload); // Remove the product from the state
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload; // Set the selected product
      });
  },
});

export default productSlice.reducer; // Export the reducer
