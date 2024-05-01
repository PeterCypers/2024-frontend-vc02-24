import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
//products -> invoegen nog
function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="bg-transparent">
      <Table className="min-w-96" aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Naam</TableCell>
            <TableCell align="center">Aantal</TableCell>
            <TableCell align="center">In stock</TableCell>
            <TableCell align="center">Eenheidsprijs</TableCell>
            <TableCell align="center">Totale prijs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : products
          ).map((product) => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row" align="right">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.aantal}</TableCell>
              <TableCell align="center">{product.instock}</TableCell>
              <TableCell align="center">{product.eenheidsprijs}</TableCell>
              <TableCell align="center">{product.totaleprijs}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}


const BestellingLeverancier = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, HERINNERINGSDATUM, klant } = bestelling;

  return (
    <>
      <div className="rounded h-screen w-auto">
        <h2 className="text-red-500 font-extrabold">Gegevens</h2>
        <div className=" grid grid-rows-4 grid-flow-col gap-4">
          <div className="text-red-950 font-bold">Order id:</div>
          <div>{ORDERID}</div>
          <div className="text-red-950 font-bold">Datum geplaatst:</div>
          <div>{DATUMGEPLAATST}</div>
          <div className="text-red-950 font-bold">Klant naam:</div>
          <div>{klant.KLANT_BEDRIJF_NAAM}</div>
          <div className="text-red-950 font-bold">Totale bedrag:</div>
          <div>prijs</div>
          <div className="text-red-950 font-bold">Contactgegevens:</div>
          <div className="col-span-2"> 
            <div>{klant.KLANT_EMAILADRES}</div>
            <div>{klant.TELEFOONNUMMER}</div>
          </div>
          <div className="text-red-950 font-bold">Leveradres:</div>
          <div className="col-span-2">
            <div>{klant.STRAAT}</div>
            <div>{klant.STRAATNR}</div>
            <div>{klant.STAD}</div>
            <div>{klant.POSTCODE} </div>
            <div>{klant.LAND}</div>
          </div>
          <div className="text-red-950 font-bold">Orderstatus:</div>
          <div className="col-span-2">{ORDERSTATUS}</div>
          <div className="text-red-950 font-bold">Bestalingstatus:</div>
          <div className="col-span-2">{BETALINGSTATUS}</div>
          <div className="text-red-950 font-bold">Betalingsherinnering:</div>
          <div className="col-span-2">{HERINNERINGSDATUM}</div>
        </div>
        <div>
          <h2 className="text-red-500 font-extrabold">Producten</h2>
          <CustomPaginationActionsTable/>
        </div>
      </div>
    </>
  );
};

export default BestellingLeverancier;
