import React, { useState, useEffect } from 'react';
import useBestellingen from '../api/bestellingClient';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Bestelling from './Bestelling';


export default function CollapsibleTable() {
  const { bestellingen } = useBestellingen();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Naam</TableCell>
            <TableCell align="center">Orderid</TableCell>
            <TableCell align="center">Orderstatus</TableCell>
            <TableCell align="center">Betaalstatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bestellingen.map((bestelling) => (
            <Bestelling key={bestelling.datum} row={bestelling} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}