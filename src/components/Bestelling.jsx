import React from "react";
import { useTheme } from '@mui/material/styles';
import { useAuth } from "../contexts/Auth.context";
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
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Link } from "react-router-dom";

export default function Bestelling({ bestelling }) {

  const {
    DATUMGEPLAATST,
    ORDERID,
    ORDERSTATUS,
    BETALINGSTATUS,
    HERINNERINGSDATUM,
    klant,
    leverancier,
    producten,
  } = bestelling;

  const getTotalePrijs = () => {
    let totalePrijs = 0;
    producten.forEach(product => {
      totalePrijs += product.PRODUCT_EENHEIDSPRIJS * product.PRODUCT_AANTAL;
    });
    return totalePrijs;
  }

  return (
    <>
      <div className="h-fit w-auto">
        <h2 className="text-red-600 font-extrabold text-2xl pb-3">Gegevens</h2>
        <div className=" grid grid-cols-4 gap-4">
          <div className="text-red-950 font-bold">Order id:</div>
          <div>{ORDERID}</div>
          <div className="text-red-950 font-bold">Datum geplaatst:</div>
          <div>{formatDateTime(DATUMGEPLAATST)}</div>
          {naam(leverancier, klant)}
          <div className="text-red-950 font-bold">Totale bedrag:</div>
          <div>&euro; {parseFloat(getTotalePrijs()).toFixed(2)}</div>
          {contact(klant)}           
          <div className="text-red-950 font-bold">Leveradres:</div>
          <div className="col-span-3">
            <div>{klant.STRAAT} {klant.STRAATNR}</div>
            <div>{klant.POSTCODE} {klant.STAD} {klant.LAND}</div>
          </div>
          <div className="text-red-950 font-bold">Orderstatus:</div>
          <div className="col-span-3">{orderstatus(ORDERSTATUS)}</div>
          <div className="text-red-950 font-bold">Betalingstatus:</div>
          <div>{betalingstatus(BETALINGSTATUS)}</div>
          <div className="col-span-2">{betaling(BETALINGSTATUS, ORDERID)}</div>
          {extra(leverancier, HERINNERINGSDATUM)}
        </div>
        <div>
          <h2 className="text-red-600 font-extrabold text-2xl mt-5">Producten</h2>
          <CustomPaginationActionsTable producten={producten}/>
        </div>
      </div>
    </>
  );
};

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

  return (
    <Box className="rounded-md w-full h-full pt-2">
      <Paper className='rounded-md w-full h-full'>
        <TableContainer>
          <Table className="min-w-96" aria-label="custom pagination table" size={'small'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Naam</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Aantal</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">In stock</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Eenheidsprijs</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Totale prijs</TableCell>
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
                    &euro; {product.PRODUCT_EENHEIDSPRIJS}
                  </TableCell>
                  <TableCell align="center">&euro; {parseFloat(product.PRODUCT_EENHEIDSPRIJS * product.PRODUCT_AANTAL).toFixed(2)}</TableCell>
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
                  rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
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
    </Box>
  );
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function naam(leverancier, klant) {
  const { gebruikerRol } = useAuth();
  if (gebruikerRol === "LEVERANCIER")
    return (
      <>
        <div className="text-red-950 font-bold">Klant naam:</div>
        <div>{klant.KLANT_BEDRIJF_NAAM}</div>
      </>
    );
  if (gebruikerRol === "KLANT")
    return (
      <>
        <div className="text-red-950 font-bold">Leverancier naam:</div>
        <div>{leverancier.LEVERANCIER_BEDRIJF_NAAM}</div>
      </>
    );
}

function contact(klant) {
  const { gebruikerRol } = useAuth();
  if (gebruikerRol === "LEVERANCIER")
    return (
      <>
        <div className="text-red-950 font-bold">Contactgegevens:</div>
        <div className="col-span-3">
          <div>{klant.KLANT_EMAILADRES}</div>
          <div>{klant.TELEFOONNUMMER}</div>
        </div>
      </>
    );
  if (gebruikerRol === "KLANT") return <></>;
}

function orderstatus(ORDERSTATUS) {
  switch (ORDERSTATUS) {
    case "GEPLAATST":
      return (
        <div className="col-span-3 font-black text-orange-300">Geplaatst</div>
      );
    case "VERWERKT":
      return (
        <div className="col-span-3 font-black text-blue-300">Verwerkt</div>
      );
    case "VERZONDEN":
      return (
        <div className="col-span-3 font-black text-purple-400">Verzonden</div>
      );
    case "UIT_VOOR_LEVERING":
      return (
        <div className="col-span-3 font-black text-rose-300">
          Uit voor levering
        </div>
      );
    case "GELEVERD":
      return <div className="col-span-3 font-black text-red-400">Geleverd</div>;
    case "VOLTOOID":
      return (
        <div className="col-span-3 font-black text-green-300">Voltooid</div>
      );
  }
}

function betalingstatus(BETALINGSTATUS) {
  switch (BETALINGSTATUS) {
    case "ONVERWERKT":
      return (
        <div className="col-span-3 font-black text-yellow-300">Onverwerkt</div>
      );
    case "FACTUUR_VERZONDEN":
      return (
        <div className="col-span-3 font-black text-indigo-400">
          Factuur verzonden
        </div>
      );
    case "BETAALD":
      return (
        <div className="col-span-3 font-black text-green-400">Betaald</div>
      );
  }
}

function extra(leverancier, HERINNERINGSDATUM) {
  const { gebruikerRol } = useAuth();
  if (gebruikerRol === "LEVERANCIER")
    return (
      <>
        <div className="text-red-950 font-bold">Herinneringsdatum:</div>
        <div className="col-span-3">{formatDateTime(HERINNERINGSDATUM)}</div>
      </>
    );
  if (gebruikerRol === "KLANT")
    return (
      <>
        <div className="text-red-950 font-bold col-span-4">Betaalgegevens</div>
        <div className="font-bold pl-5">Rekeningnummer:</div>
        <div className="col-span-3">
          {leverancier.LEVERANCIER_BEDRIJF_REKENINGNUMMER}
        </div>
        <div className="font-bold pl-5">BTW-nummer:</div>
        <div className="col-span-3">
          {leverancier.LEVERANCIER_BEDRIJF_BTWNR}
        </div>
      </>
    );
}

function betaling(BETALINGSTATUS, ORDERID) {
  const { gebruikerRol } = useAuth();
  if (gebruikerRol === "KLANT" && BETALINGSTATUS !== "BETAALD")
    return (
      <Button variant="contained" sx={{ marginTop: "10px" }}>
        <Link to={`/bestelling/${ORDERID}/betaling`}>Betalen</Link>
      </Button>
    );
}