// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.NAAM}
        </Typography>
        <Typography color="text.secondary">
          €{product.EENHEIDSPRIJS}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    NAAM: PropTypes.string.isRequired,
    EENHEIDSPRIJS: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
