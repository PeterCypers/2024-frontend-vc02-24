import React from 'react';
import ProductList from '../components/ProductList';
import { Container, Typography,Box } from '@mui/material';

const ProductPage = () => {
    return (
        <Container>
            <Box sx={{ backgroundColor: 'red', p: 3 }}>
                <Typography variant="h4" component="h1" color="white">
                    Producten
                </Typography>
            </Box>
            <ProductList />
        </Container>
    );
};

export default ProductPage;