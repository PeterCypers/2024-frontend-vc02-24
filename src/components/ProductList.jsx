import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Grid, CircularProgress, Typography, Box, Select, MenuItem, FormControl, InputLabel, Pagination } from '@mui/material';
import SearchBar from './SearchBar';
import useSWR from 'swr';
import { getAll } from "../api";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const queryParams = useMemo(() => {
    const filterParam = `${searchTerm ? 'filter=' : ''}${searchTerm || ''}`;
    const orderParam = `${sortOrder ? 'order=' : ''}${sortOrder || ''}`;
    const offsetParam = `offset=${(page-1)*itemsPerPage}`;
    const limitParam = `limit=${itemsPerPage}`;

    return [limitParam, offsetParam, filterParam, orderParam].filter(str => str !== '').join('&');
  }, [searchTerm, sortOrder, page, itemsPerPage]);

  const {
    data: productenData = { items: [] },
    isLoading,
    error,
  } = useSWR(`products?${queryParams}`, getAll, {revalidateOnMount: true});
  
  // Update filtered products based on search term and sort order
  useEffect(() => {
    setPage(1); // Reset to first page when sorting changes
  }, [searchTerm, sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <div className="flex justify-between justify-items-center content-center gap-2 p-2">
        <SearchBar handleClick={handleSearch} placeholder_text="Search products..." />
        <FormControl className='w-52 self-center' variant="outlined" size="small" >
          <InputLabel id="sort-label">Sort By Price</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOrder}
            label="Sort By Price"
            onChange={handleSortChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
            <MenuItem value="asc">Price: Low to High</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {!isLoading ? <>
          <Box className="flex justify-center my-2">
            <Pagination
              color="primary"
              count={Math.ceil(productenData.total / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
          <Grid container spacing={2} justifyContent="center">
            {productenData.items.map(product => (
              <ProductCard key={product.PRODUCTID} product={product} />
            ))}
          </Grid>
          <Box className="flex justify-center my-2">
            <Pagination
              color="primary"
              count={Math.ceil(productenData.total / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </> : <>
          <Box className="flex justify-center my-2 py-80">
            <CircularProgress />
          </Box>
        </>}
      </div>
    </>
  );
};

export default ProductList;
