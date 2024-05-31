import { useState } from 'react';
import { fetchProducts, deleteProduct, Product } from '../redux/slices/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  
  const [open, setOpen] = useState(false); // State to manage the open state of the dialog
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // State to manage the selected product ID for deletion

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    setSelectedProductId(id); // Set the selected product ID for deletion
    setOpen(true); // Open the confirmation dialog
  };

  const confirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId)); // Dispatch the delete action
      setOpen(false); // Close the dialog
      setSelectedProductId(null); // Clear the selected product ID
    }
  };

  const cancelDelete = () => {
    setOpen(false); // Close the dialog
    setSelectedProductId(null); // Clear the selected product ID
  };

  // Show loading spinner if data is loading
  if (loading) return <CircularProgress />;

  // Show error message when there is error
  if (error) return <p>Error: {error}</p>;

  return (
    <>
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
      {/* Confirmation dialog */}
      <Dialog open={open} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;










// import { fetchProducts, deleteProduct, Product } from '../redux/slices/productSlice';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Button } from '@mui/material';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import Link from 'next/link';

// interface ProductTableProps {
//   onEdit: (product: Product) => void;
// }

// const ProductTable: React.FC<ProductTableProps> = ({ onEdit }) => {
//   // Set up Redux dispatch with proper ThunkDispatch typing
//   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

//   // Extract products, loading status, and error from the Redux store
//   const { products, loading, error } = useSelector((state: RootState) => state.products);

//   // Fetch products when the component mounts
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Handle product deletion
//   const handleDelete = (id: string) => {
//     dispatch(deleteProduct(id));
//   };

//   // Show loading spinner if data is loading
//   if (loading) return <CircularProgress />;

//   // Show error message if there is an error
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Quantity</TableCell>
//             <TableCell>Actions</TableCell>
//             <TableCell>View Details</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Render table rows for each product */}
//           {products.map((product) => (
//             <TableRow key={product.id}>
//               <TableCell>{product.name}</TableCell>
//               <TableCell>{product.price}</TableCell>
//               <TableCell>{product.description}</TableCell>
//               <TableCell>{product.quantity}</TableCell>
//               <TableCell>
//                 {/* Edit button */}
//                 <IconButton onClick={() => onEdit(product)}>
//                   <img src="/icons/edit.svg" alt="Edit Icon" />
//                 </IconButton>
//                 {/* Delete button */}
//                 <IconButton onClick={() => handleDelete(product.id)}>
//                   <img src="/icons/delete.svg" alt="Delete Icon" />
//                 </IconButton>
//               </TableCell>
//               <TableCell>
//                 {/* Link to product details page */}
//                 <Link href={`/products/${product.id}`} passHref>
//                   <Button component="a">View Details</Button>
//                 </Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ProductTable;
