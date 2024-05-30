// src/components/ProductDetails.tsx

// Import necessary modules and types
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProductById, Product } from '../redux/slices/productSlice';
import { Box, Typography } from '@mui/material';

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id as string));
    }
  }, [id, dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!selectedProduct) return <Typography>Product not found</Typography>;

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









// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { fetchProducts, Product } from '../redux/slices/productSlice';
// import { Box, Typography } from '@mui/material';

// const ProductDetails: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state: RootState) => state.products);
//   const product = products.find((p: Product) => p.id === id);

//   useEffect(() => {
//     if (!products.length) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, products.length]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error: {error}</Typography>;
//   if (!product) return <Typography>Product not found</Typography>;

//   return (
//     <Box>
//       <Typography variant="h4">{product.name}</Typography>
//       <Typography variant="h6">Price: ${product.price}</Typography>
//       <Typography>Description: {product.description}</Typography>
//       <Typography>Quantity: {product.quantity}</Typography>
//     </Box>
//   );
// };

// export default ProductDetails;
