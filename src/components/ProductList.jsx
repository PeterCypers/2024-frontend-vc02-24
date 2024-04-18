// src/components/ProductList.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import productClient from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productClient.get('/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.PRODUCTID} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
