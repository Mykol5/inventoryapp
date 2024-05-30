import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { Product } from '../redux/slices/productSlice';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleOpen = () => {
    setEditProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  return (
    <Container>
      <Typography variant="h3" component="h2" gutterBottom>Inventory Management</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Product</Button>
      <ProductTable onEdit={handleEdit} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <ProductForm initialProduct={editProduct || undefined} isUpdate={!!editProduct} onClose={handleClose} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
        </DialogActions> */}
      </Dialog>
    </Container>
  );
};

export default HomePage;

