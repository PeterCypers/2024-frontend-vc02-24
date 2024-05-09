import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from "@mui/material";
import { red } from "@mui/material/colors";
import { getAll, updateAllNotifications } from "../api/index";  

const NotificatieList = () => {
  const [notificaties, setNotificaties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const updateAndFetchNotificaties = async () => {
      try {
        
        await updateAllNotifications();

        
        const fetchedNotificaties = await getAll('notificaties');
        setNotificaties(fetchedNotificaties);
      } catch (error) {
        console.error('Fout bij het ophalen van notificaties:', error);
      }
    };

    updateAndFetchNotificaties();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (orderId) => {
    navigate(`/profiel/bestellingen/${orderId}`);
  };

  return (
    <Box className="rounded-md w-full h-full pt-5" style={{backgroundColor: 'transparent'}}>
      <Paper className='rounded-md w-full h-full' style={{backgroundColor: 'transparent'}}>
        <TableContainer className='bg-transparent'>
          <Table aria-label="notification table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Datum</TableCell>
                <TableCell align="center">Bericht</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Order ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notificaties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notificatie) => (
                <TableRow hover key={notificatie.NOTIFICATIEID} onClick={() => handleRowClick(notificatie.ORDERID)} sx={{ cursor: 'pointer' }}>
                  <TableCell align="center">{new Date(notificatie.DATUM).toLocaleDateString()}</TableCell>
                  <TableCell align="left">{notificatie.BERICHT}</TableCell>
                  <TableCell align="center">{notificatie.NOTIFICATIESTATUS}</TableCell>
                  <TableCell sx={{ color: red[500] }} align="center">{notificatie.ORDERID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            className='bg-transparent'
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={notificaties.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default NotificatieList;