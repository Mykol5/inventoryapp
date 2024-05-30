import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchProductById } from '../redux/slices/productSlice';
import { Box, Typography } from '@mui/material';

const ProductDetails: React.FC = () => {
  // Use Next.js router to access the current route parameters
  const router = useRouter();
  // Extract id parameter from the route query
  const { id } = router.query;
  
  // Set up Redux dispatch with proper ThunkDispatch typing
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
  // Get loading state, error message, and selected product from Redux store
  const { loading, error, selectedProduct } = useSelector((state: RootState) => state.products);

  // Fetch product details when id changes
  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchProductById(id)); // Fetch the product by id if it exists and is a string
    }
  }, [id, dispatch]);

  // Render loading, error, or product details based on state
  if (loading) return <Typography>Loading...</Typography>; // Show loading indicator
  if (error) return <Typography>Error: {error}</Typography>; // Show error message
  if (!selectedProduct) return <Typography>Product not found</Typography>; // Show 'not found' message if product is not found

  // Render product details
  return (
    <Box>
      <Typography variant="h4">{selectedProduct.name}</Typography>
      <Typography variant="h6">Price: ${selectedProduct.price}</Typography>
      <Typography>Description: {selectedProduct.description}</Typography>
      <Typography>Quantity: {selectedProduct.quantity}</Typography>
    </Box>
  );
};

export default ProductDetails;
