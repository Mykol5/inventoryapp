import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { fetchProducts, Product } from '../../redux/slices/productSlice';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const product = products.find((p: Product) => p.id === id); // Find the product with the matching ID

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts()); // Fetch products if not already loaded
    }
  }, [dispatch, products.length]);

  if (loading) return <CircularProgress />; // Show loading spinner if data is being loaded
  if (error) return <Typography>Error: {error}</Typography>; // Show error message if thereis an error
  if (!product) return <Typography>Product not found</Typography>; // Show message if the product is not found

  return (
    <Box p={2}>
      <Card elevation={3} sx={{ backgroundColor: '#F5F5DC', display: 'flex' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent sx={{ textAlign: { xs: 'left', md: 'left' }, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {product.quantity}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProductDetails;
