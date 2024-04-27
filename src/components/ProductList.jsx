import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography, Box,Pagination  } from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchBar from './SearchBar';


const ProductList = () => {
    const { getAllProducts } = useProducts();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // gefilterde lijst bewaren
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

        // Pagination state
        const [page, setPage] = useState(1);
        const itemsPerPage = 10;
  
    //ophalen van alle producten
    useEffect(() => {
      const fetchAllProducts = async () => {
        setLoading(true);
        try {
          const fetchedProducts = await getAllProducts();
          setAllProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts); // Begin met de volledige lijst
          setError('');
        } catch (error) {
          console.error('Error fetching products:', error);
          setError('Failed to fetch products');
        }
        setLoading(false);
      };
  
      fetchAllProducts();
    }, []);
  
    // voor het filteren van producten
    useEffect(() => {
      const filtered = allProducts.filter(product =>
        product.NAAM.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchTerm, allProducts]);
  
    const handleSearch = (text) => {
      setSearchTerm(text);
    };
        // Calculate paginated products
        const indexOfLastProduct = page * itemsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
        const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
  
    return (
      <>
          <Box sx={{ width: '100%', padding: 2 }}>
              <SearchBar handleClick={handleSearch} placeholder_text="Search products..." />
          </Box>
          <Box sx={{ backgroundColor: 'grey.400', p: 2 }}>
              <Grid container spacing={2} justifyContent="center">
                  {currentProducts.map(product => (
                      <ProductCard key={product.PRODUCTID} product={product} />
                  ))}
              </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination
                  color="primary"
                  count={Math.ceil(filteredProducts.length / itemsPerPage)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
              />
          </Box>
      </>
  );
};

export default ProductList;