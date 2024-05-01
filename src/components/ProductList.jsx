import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography, Box, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchBar from './SearchBar';


const ProductList = () => {
  const { getAllProducts } = useProducts();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getAllProducts();
        setAllProducts(fetchedProducts);
        setProducts(fetchedProducts); // initially same as all products
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [];
    if (sortOrder === 'high') {
      sortedProducts = [...allProducts].sort((a, b) => b.EENHEIDSPRIJS - a.EENHEIDSPRIJS);
    } else if (sortOrder === 'low') {
      sortedProducts = [...allProducts].sort((a, b) => a.EENHEIDSPRIJS - b.EENHEIDSPRIJS);
    } else {
      sortedProducts = [...allProducts];
    }
    setProducts(sortedProducts);
  }, [sortOrder, allProducts]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}>
          <SearchBar placeholder_text="Search products..." />
          <FormControl variant="outlined" size="small" sx={{ width: 80 }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sortOrder}
                  label="Sort By Price"
                  onChange={handleSortChange}
              >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="high">Price: High to Low</MenuItem>
                  <MenuItem value="low">Price: Low to High</MenuItem>
              </Select>
          </FormControl>
      </Box>
      <Box sx={{ backgroundColor: 'grey.400', p: 2 }}>
          <Grid container spacing={2} justifyContent="center">
              {products.map(product => (
                  <ProductCard key={product.PRODUCTID} product={product} />
              ))}
          </Grid>
      </Box>
    </>
  );
};

export default ProductList;