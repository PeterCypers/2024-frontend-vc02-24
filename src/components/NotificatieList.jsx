import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";

const NotificatieList = ({ notificaties }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (orderId) => {
    navigate(`/bestellingen/${orderId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="notification table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Bericht</TableCell>
            <TableCell align="center">Order ID</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notificaties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notificatie) => (
            <TableRow hover key={notificatie.NOTIFICATIEID} onClick={() => handleRowClick(notificatie.ORDERID)} sx={{ cursor: 'pointer' }}>
              <TableCell align="center">{new Date(notificatie.DATUM).toLocaleDateString()}</TableCell>
              <TableCell align="center">{notificatie.BERICHT}</TableCell>
              <TableCell align="center">{notificatie.ORDERID}</TableCell>
              <TableCell align="center">{notificatie.NOTIFICATIESTATUS}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={notificaties.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default NotificatieList;