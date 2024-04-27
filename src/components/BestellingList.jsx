import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box
} from '@mui/material';
import SearchBar from './SearchBar'; // Import SearchBar component
import Bestelling from './Bestelling';

export default function BestellingList({ bestellingen }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    setPage(1); // Reset to first page when search changes
  };

  // Filter bestellingen based on the search term
  const filteredBestellingen = bestellingen.filter(bestelling =>
    bestelling.klant.KLANT_BEDRIJF_NAAM.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the currently displayed items
  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentBestellingen = filteredBestellingen.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
          <TableRow>
          </TableRow>
            <TableRow>
              <TableCell /> 
              <TableCell align="left" size="small">
                <SearchBar handleClick={handleSearch} placeholder_text="Search" />
              </TableCell>
              <TableCell align="center">Datum</TableCell>
              <TableCell align="center">Naam</TableCell>
              <TableCell align="center">Orderid</TableCell>
              <TableCell align="center">Orderstatus</TableCell>
              <TableCell align="center">Betaalstatus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBestellingen.map((bestelling) => (
              <Bestelling key={bestelling.ORDERID} bestelling={bestelling} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        component="div"
        count={Math.ceil(filteredBestellingen.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ padding: 2, justifyContent: "center", display: "flex" }}
      />
    </>
  );
}