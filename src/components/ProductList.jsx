// src/components/ProductList.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { getAllProducts } = useProducts(); 
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productData = await getAllProducts(); // gebruik de functie uit de hook
          setProducts(productData); // verwerk de data zoals die wordt teruggestuurd van je API
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [getAllProducts]); // Voeg getAllProducts toe aan de dependency array
  
    return (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}> {/* Aangepast naar `product.id` */}
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  };
  
  export default ProductList;
