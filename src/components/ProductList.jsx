import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography,Box } from '@mui/material';
import SearchBar from './SearchBar';  


const ProductList = () => {
    const { getAllProducts } = useProducts();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // gefilterde lijst bewaren
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
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
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }
  
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 2 }}>
                <SearchBar handleClick={handleSearch} placeholder_text="Search products..." />
            </Box>
            <Box sx={{ backgroundColor: '#D9D9D9', padding: 3,height: 4000, width: 1200  }}> {/* Grey background */}
                <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 2 }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.PRODUCTID} product={product} />
                    ))}
                </Grid>
            </Box>
        </>
    );
};
  

export default ProductList;