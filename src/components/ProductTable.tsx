import { fetchProducts, deleteProduct, Product } from '../redux/slices/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Button } from '@mui/material';
import { ThunkDispatch } from '@reduxjs/toolkit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { IonIcon } from '@ionic/react';
// import { trashOutline, pencilOutline } from 'ionicons/icons';
import Link from 'next/link';

interface ProductTableProps {
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ onEdit }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <CircularProgress />;
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
            <TableCell>View Details</TableCell> {/* Moved this TableCell outside the map function */}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(product)}>
                  <img src="/icons/edit.svg" alt="Edit Icon" />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <img src="/icons/delete.svg" alt="Delete Icon" />
                </IconButton>
              </TableCell>
              <TableCell>
                {/* Moved Link component inside the map function */}
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
