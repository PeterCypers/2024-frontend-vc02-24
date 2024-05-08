import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  FormControlLabel,
  Switch,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function CustomPaginationActionsTable({ producten }) {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - producten.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <Box
      className="rounded-md w-full h-full pt-5"
      style={{ backgroundColor: "transparent" }}
    >
      <Paper
        className="rounded-md w-full h-full"
        style={{ backgroundColor: "transparent" }}
      >
        <TableContainer className="bg-transparent">
          <Table
            className="min-w-96"
            aria-label="custom pagination table"
            size={dense ? "small" : "medium"}
          >
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
                ? producten.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : producten
              ).map((product) => (
                <TableRow key={product.PRODUCT_NAAM}>
                  <TableCell component="th" scope="row" align="left">
                    {product.PRODUCT_NAAM}
                  </TableCell>
                  <TableCell align="center">{product.PRODUCT_AANTAL}</TableCell>
                  <TableCell align="center">{product.PRODUCT_STOCK}</TableCell>
                  <TableCell align="center">
                    € {product.PRODUCT_EENHEIDSPRIJS}
                  </TableCell>
                  <TableCell align="center">todo</TableCell>
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  count={producten.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

const BestellingKlant = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const {
    DATUMGEPLAATST,
    ORDERID,
    ORDERSTATUS,
    BETALINGSTATUS,
    klant,
    leverancier,
    producten,
  } = bestelling;

  return (
    <>
      <div className="h-auto w-auto p-5 rounded-md bg-gray-400 bg-opacity-65">
        <h2 className="text-red-600 font-extrabold text-2xl">Gegevens</h2>
        <div className=" grid grid-cols-4 gap-4">
          <div className="text-red-950 font-bold">Order id:</div>
          <div>{ORDERID}</div>
          <div className="text-red-950 font-bold">Datum geplaatst:</div>
          <div>{formatDateTime(DATUMGEPLAATST)}</div>
          <div className="text-red-950 font-bold">Leverancier naam:</div>
          <div>{leverancier.LEVERANCIER_BEDRIJF_NAAM}</div>
          <div className="text-red-950 font-bold">Totale bedrag:</div>
          <div>prijs</div>
          <div className="text-red-950 font-bold">Leveradres:</div>
          <div className="col-span-3">
            <div>{klant.STRAAT}</div>
            <div>{klant.STRAATNR}</div>
            <div>{klant.STAD}</div>
            <div>{klant.POSTCODE} </div>
            <div>{klant.LAND}</div>
          </div>
          <div className="text-red-950 font-bold">Orderstatus:</div>
          <div className="col-span-3">{ORDERSTATUS}</div>
          <div className="text-red-950 font-bold">Bestalingstatus:</div>
          <div className="col-span-3">{BETALINGSTATUS}</div>
          <div className="text-red-950 font-bold col-span-4">
            Betaalgegevens
          </div>
          <div className="font-bold pl-5">Rekeningnummer:</div>
          <div className="col-span-3">
            {leverancier.LEVERANCIER_BEDRIJF_REKENINGNUMMER}
          </div>
          <div className="font-bold pl-5">BTW-nummer:</div>
          <div className="col-span-3">
            {leverancier.LEVERANCIER_BEDRIJF_BTWNR}
          </div>
        </div>
        <div>
          <h2 className="text-red-600 font-extrabold text-2xl mt-5">
            Producten
          </h2>
          <CustomPaginationActionsTable producten={producten} />
        </div>
      </div>
    </>
  );
};

export default BestellingKlant;
