import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchProducts, Product } from '../../redux/slices/productSlice';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent } from '@mui/material';

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const product = products.find((p: Product) => p.id === id);

  useEffect(() => {
    if (!products.length) {
      // dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box p={2}>
      <Card elevation={3} sx={{ backgroundColor: '#F5F5DC', display: 'flex' }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            {/* <CardMedia
              component="img"
              alt={product.name}
              height="100%"
              image={product.imageUrl}
            /> */}
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
