import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography, Box, Select, MenuItem, FormControl, InputLabel, Pagination } from '@mui/material';
import SearchBar from './SearchBar';

const ProductList = () => {
  const { getAllProducts } = useProducts();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all products initially
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getAllProducts();
        setAllProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
      setLoading(false);
    };

    fetchAllProducts();
  }, []);

  // Update filtered products based on search term and sort order
  useEffect(() => {
    let filtered = allProducts.filter(product =>
      product.NAAM.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'high') {
      filtered = filtered.sort((a, b) => b.EENHEIDSPRIJS - a.EENHEIDSPRIJS);
    } else if (sortOrder === 'low') {
      filtered = filtered.sort((a, b) => a.EENHEIDSPRIJS - b.EENHEIDSPRIJS);
    }

    setFilteredProducts(filtered);
    setPage(1); // Reset to first page when sorting changes
  }, [sortOrder, searchTerm, allProducts]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box className="flex justify-items-center gap-2 p-2">
        <SearchBar handleClick={handleSearch} placeholder_text="Search products..." />
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel id="sort-label">Sort By Price</InputLabel>
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
      <Box className="bg-gray-300 p-2 rounded-md">
        <Box className="flex justify-center my-2">
          <Pagination
            color="primary"
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {currentProducts.map(product => (
            <ProductCard key={product.PRODUCTID} product={product} />
          ))}
        </Grid>
        <Box className="flex justify-center my-2">
          <Pagination
            color="primary"
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductList;