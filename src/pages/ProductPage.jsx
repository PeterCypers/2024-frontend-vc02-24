import React from 'react';
import ProductList from '../components/ProductList';
import productPageBackground from '/images/productPageBackground.png'; 
import { Box } from '@mui/material';
import ChatFloatingButton from '../components/ChatFloatingButton';

const ProductPage = () => {
    return (
        <div className='w-full'>
            <Box 
                sx={{ 
                    backgroundImage: `url(${productPageBackground})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: "no-repeat",
                    p: 5, 
                    mb: 3,
                    mt: 2,
                    width: '100%',
                }}
            >
                <h1 id='h1'>Producten</h1>
            </Box>
            <div className="p-1 ml-4 mr-4 h-full" id="product-container">
                <ProductList />


                
            </div>
        </div>
    );
};

export default ProductPage;
