// src/components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, Product } from '../redux/slices/productSlice';
import { CircularProgress, TextField, Button, Box, Typography } from '@mui/material';

interface ProductFormProps {
  initialProduct?: Product;
  isUpdate?: boolean;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, isUpdate = false, onClose }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>(initialProduct || { id: '', name: '', price: 0, description: '', quantity: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isUpdate) {
        await dispatch(updateProduct(product)).unwrap();
      } else {
        await dispatch(addProduct(product)).unwrap();
      }
      onClose();
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField name="name" label="Name" value={product.name} onChange={handleChange} required />
      <TextField name="price" label="Price" type="number" value={product.price} onChange={handleChange} required />
      <TextField name="description" label="Description" value={product.description} onChange={handleChange} required />
      <TextField name="quantity" label="Quantity" type="number" value={product.quantity} onChange={handleChange} required />
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





// // src/components/ProductForm.tsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addProduct, updateProduct, Product } from '../redux/slices/productSlice';

// interface ProductFormProps {
//   initialProduct?: Product;
//   isUpdate?: boolean;
//   onClose: () => void;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, isUpdate = false, onClose }) => {
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState<Product>(initialProduct || { id: '', name: '', price: 0, description: '', quantity: 0 });

//   useEffect(() => {
//     if (initialProduct) {
//       setProduct(initialProduct);
//     }
//   }, [initialProduct]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isUpdate) {
//       dispatch(updateProduct(product));
//     } else {
//       dispatch(addProduct(product));
//     }
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
//       <input name="price" value={product.price} onChange={handleChange} placeholder="Price" type="number" required />
//       <input name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
//       <input name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" type="number" required />
//       <button type="submit">{isUpdate ? 'Update' : 'Add'} Product</button>
//     </form>
//   );
// };

// export default ProductForm;


