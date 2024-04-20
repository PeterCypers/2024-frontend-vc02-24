import React, { useState, useEffect } from 'react';
import useProducts from '../api/productClient';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography } from '@mui/material';
import SearchBar from './SearchBar';  // Zorg dat dit pad correct is naar je SearchBar component

const ProductList = () => {
    const { getAllProducts } = useProducts();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [searchTerm]); // Dependency on searchTerm to refetch when it changes

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Pass searchTerm to getAllProducts, assumed it's designed to handle an empty string as "no filter"
            const fetchedProducts = await getAllProducts(searchTerm);
            setProducts(fetchedProducts);
            setError('');
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
        }
        setLoading(false);
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update searchTerm state which triggers useEffect
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <SearchBar handleClick={handleSearch} placeholder_text="Search products..." />
            <Grid container spacing={2}>
                {products.map((product) => (
                    <ProductCard key={product.PRODUCTID} product={product} />
                ))}
            </Grid>
        </>
    );
};

export default ProductList;