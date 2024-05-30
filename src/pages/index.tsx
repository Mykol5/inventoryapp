import React, { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { Product } from '../redux/slices/productSlice';

const HomePage: React.FC = () => {
  // State to control the open/close state of the dialog
  const [open, setOpen] = useState(false);

  // State to hold the product being edited
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Open the dialog for adding a new product
  const handleOpen = () => {
    setEditProduct(null);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
  };

  // Open the dialog for editing an existing product
  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  return (
    <Container>
      {/* Page title */}
      <Typography variant="h3" component="h2" gutterBottom>
        Inventory Management
      </Typography>
      
      {/* Button to open the dialog for adding a new product */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>
      
      {/* Table displaying the list of products */}
      <ProductTable onEdit={handleEdit} />
      
      {/* Dialog for adding/editing a product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <ProductForm initialProduct={editProduct || undefined} isUpdate={!!editProduct} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HomePage;
