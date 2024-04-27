import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Pagination } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Bestelling from "./Bestelling";
import useSWR from "swr";

export default function BestellingList({ bestellingen }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5; // Adjust the number of items per page as needed
  const [open, setOpen] = useState(false);

  // Toggle function for opening and closing the detailed view
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the currently displayed items
  const indexOfLastItem = page * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentBestellingen = bestellingen.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
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
            {currentBestellingen.map((bestelling) => (
              <Bestelling
                key={bestelling.ORDERID}
                bestelling={bestelling}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        component="div"
        count={Math.ceil(bestellingen.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ padding: 2, justifyContent: "center", display: "flex" }}
      />
    </>
  );
}
