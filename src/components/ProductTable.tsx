import { fetchProducts, deleteProduct, Product } from '../redux/slices/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Button } from '@mui/material';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Link from 'next/link';

interface ProductTableProps {
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ onEdit }) => {
  // Set up Redux dispatch with proper ThunkDispatch typing
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Extract products, loading status, and error from the Redux store
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle product deletion
  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  // Show loading spinner if data is loading
  if (loading) return <CircularProgress />;

  // Show error message if there is an error
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render table rows for each product */}
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {/* Edit button */}
                <IconButton onClick={() => onEdit(product)}>
                  <img src="/icons/edit.svg" alt="Edit Icon" />
                </IconButton>
                {/* Delete button */}
                <IconButton onClick={() => handleDelete(product.id)}>
                  <img src="/icons/delete.svg" alt="Delete Icon" />
                </IconButton>
              </TableCell>
              <TableCell>
                {/* Link to product details page */}
                <Link href={`/products/${product.id}`} passHref>
                  <Button component="a">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
