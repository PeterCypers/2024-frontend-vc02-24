import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from "@mui/material";
import { red } from "@mui/material/colors";
import { updateNotificationStatus } from "../api/index";
import { useAuth } from "../contexts/Auth.context";
import BetaalHerinnering from "./BetaalHerinnering";

const NotificatieList = ({notificaties}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  //voor component BetaalHerinnering:
  const { gebruikerRol } = useAuth();
  const [orderIds, setOrderIds] = useState([]);
  useEffect(() => {
    const ids = notificaties.map(notificatie => notificatie.ORDERID);
    setOrderIds(ids);
  }, [notificaties]);
  //end voor component BetaalHerinnering

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = async (notificatie) => {
    try {
      await updateNotificationStatus(notificatie, "gelezen");
      fetchNotificaties(); //werkt dit?
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
    navigate(`/profiel/bestellingen/${notificatie.ORDERID}`);
  };

  return (
    <Box className="rounded-md w-full h-full">
      <Paper className='rounded-md w-full h-fit'>
        <TableContainer>
          <Table aria-label="notification table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Datum</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Bericht</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notificaties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notificatie) => (
                <TableRow hover onClick={() => handleRowClick(notificatie)} sx={{ cursor: 'pointer' }}>
                  <TableCell align="center">{new Date(notificatie.DATUM).toLocaleDateString()}</TableCell>
                  <TableCell align="left">{notificatie.BERICHT}</TableCell>
                  <TableCell align="center">{formatNotificatiestatus(notificatie.NOTIFICATIESTATUS)}</TableCell>
                  <TableCell sx={{ color: red[500], fontWeight: 'bold'}} align="center">{notificatie.ORDERID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
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
      { gebruikerRol === "LEVERANCIER" && (
            <BetaalHerinnering orderIds={orderIds}/>
          )
        }
    </Box>
  );
};

function formatNotificatiestatus(NOTIFICATIESTATUS){
  switch(NOTIFICATIESTATUS){
    case "ongelezen": 
      return <div className="font-black text-violet-400">Ongelezen</div>;
    case "nieuw":
      return <div className="font-black text-pink-400">Nieuw</div>
    case "gelezen":
      return <div className="font-black text-teal-500">Gelezen</div>
  }
}

export default NotificatieList;
