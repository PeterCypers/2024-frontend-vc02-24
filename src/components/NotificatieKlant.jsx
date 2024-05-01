import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, TableHead } from '@mui/material';

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

const NotificatieKlant = ({ notificatie }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box className="rounded-md w-full h-full pt-5" style={{ backgroundColor: 'transparent' }}>
        <Paper className='rounded-md w-full h-full' style={{ backgroundColor: 'transparent' }}>
          <TableContainer className='bg-transparent'>
            <Table className='min-w-96'>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Datum</TableCell>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Bericht</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover key={notificatie.NOTIFICATIEID}>
                  <TableCell align="center">{formatDateTime(notificatie.DATUM)}</TableCell>
                  <TableCell align="center">{notificatie.ORDERID}</TableCell>
                  <TableCell align="center">{notificatie.NOTIFICATIESTATUS}</TableCell>
                  <TableCell align="center">{notificatie.BERICHT}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            count={1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default NotificatieKlant;