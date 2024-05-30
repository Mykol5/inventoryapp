// src/redux/slices/productSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct?: Product; // Include selectedProduct as an optional property
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Create async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://inventory.free.beeceptor.com/api/inventory/${id}`);
    return response.data;
  } catch (error) {
    // return rejectWithValue(message);
  }
});


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://inventory.free.beeceptor.com/api/inventory');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
  const response = await axios.post('https://inventory.free.beeceptor.com/api/inventory', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
  const response = await axios.put(`https://inventory.free.beeceptor.com/api/inventory/${product.id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await axios.delete(`https://inventory.free.beeceptor.com/api/inventory/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;







// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'https://inventory.free.beeceptor.com/api/inventory';

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   quantity: number;
// }

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// });

// export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
//   const response = await axios.post(API_URL, product);
//   return response.data;
// });

// export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
//   const response = await axios.put(`${API_URL}/${product.id}`, product);
//   return response.data;
// });

// export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// });

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch products';
//       })
//       .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
//         state.products.push(action.payload);
//       })
//       .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
//         const index = state.products.findIndex(product => product.id === action.payload.id);
//         if (index !== -1) {
//           state.products[index] = action.payload;
//         }
//       })
//       .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
//         state.products = state.products.filter(product => product.id !== action.payload);
//       });
//   },
// });

// export default productSlice.reducer;
