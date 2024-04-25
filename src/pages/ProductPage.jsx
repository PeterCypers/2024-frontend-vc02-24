import React from 'react';
import ProductList from '../components/ProductList';
import { Container, Typography,Box } from '@mui/material';
import productPageBackground from '/images/productPageBackground.png'; // Import the background image

const ProductPage = () => {
    return (
        <>
            <Box 
                sx={{ 
                    backgroundImage: `url(${productPageBackground})`, // Set the background image using the imported image
                    backgroundSize: 'cover', // Ensure the image covers the full area
                    backgroundPosition: 'center center', // Center the image
                    p: 2, 
                    mb: 5,
                    color: 'white', // Text color
                    display: 'flex', // To use flexbox layout
                    alignItems: 'center', // Align items vertically
                    height: '100px' 
                }}
            >
                <Typography id="h1" variant="h4" component="h1" className="ml-2">
                    Producten
                </Typography>
            </Box>
            <Box sx={{  p: 2, borderRadius: '20px', mt: -2, ml: 2, mr: 2 }}>
                <ProductList />
            </Box>
        </>
    );
};

export default ProductPage;