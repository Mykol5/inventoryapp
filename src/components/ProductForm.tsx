import { addProduct, updateProduct, Product } from '../redux/slices/productSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CircularProgress, TextField, Button, Box, Typography } from '@mui/material';

interface ProductFormProps {
  initialProduct?: Product;
  isUpdate?: boolean;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, isUpdate = false, onClose }) => {
  // Set up Redux dispatch with proper ThunkDispatch typing
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Initialize state for the product, loading status, and error message
  const [product, setProduct] = useState<Product>(initialProduct || { id: '', name: '', price: 0, description: '', quantity: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update product state if initialProduct prop changes
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isUpdate) {
        // Dispatch updateProduct action if isUpdate is true
        await dispatch(updateProduct(product)).unwrap();
      } else {
        // Dispatch addProduct action if isUpdate is false
        await dispatch(addProduct(product)).unwrap();
      }
      onClose(); // Close the form on successful submission
    } catch (err) {
      setError('Failed to save product. Please try again.'); // Set error message on failure
    } finally {
      setLoading(false); // Set loading to false after the operation
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="name"
        label="Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={product.price}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <TextField
        name="quantity"
        label="Quantity"
        type="number"
        value={product.quantity}
        onChange={handleChange}
        required
      />
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : isUpdate ? 'Update' : 'Add'} Product
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
