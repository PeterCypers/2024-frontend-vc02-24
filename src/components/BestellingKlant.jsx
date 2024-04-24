import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BestellingKlant = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, klant, leverancier } = bestelling;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{DATUMGEPLAATST}</TableCell>
        <TableCell align="center">{klant.KLANT_BEDRIJF_NAAM}</TableCell>
        <TableCell align="center">{ORDERID}</TableCell>
        <TableCell align="center">{ORDERSTATUS}</TableCell>
        <TableCell align="center">{BETALINGSTATUS}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 5 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Grid 
                  container
                  spacing={3}
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Grid xs={11}>Gegevens</Grid>
                  <Grid xs={8}>
                    <div>Betaalgegevens:</div>
                  </Grid>
                  <Grid xs={2}>
                    <div>Totale bedrag:</div>
                  </Grid>
                  <Grid xs={2}>
                    <div>prijs</div> {/*Totale prijs van alle producten */}
                  </Grid>
                  <Grid xs={2}>
                    <div>Rekeningnummer:</div>
                  </Grid>
                  <Grid xs={10}>
                    <div>
                       {leverancier.LEVERANCIER_BEDRIJF_REKENINGNUMMER}
                    </div>
                  </Grid>
                  <Grid xs={2}>
                    <div>BTW-nummer:</div>
                  </Grid>
                  <Grid xs={10}>
                    <div>{leverancier.LEVERANCIER_BEDRIJF_BTWNR}</div>
                  </Grid>
                  <Grid xs={2}>
                    <div>Leveradres:</div>
                  </Grid>
                  <Grid xs={10}>
                    <div>{klant.LAND}</div>
                    <div>{klant.POSTCODE}</div>
                    <div>{klant.STAD}</div>
                    <div>{klant.STRAAT}</div>
                    <div>{klant.STRAATNR}</div>
                  </Grid>
                </Grid>
                Product
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Naam</TableCell>
                    <TableCell align="center">Aantal</TableCell>
                    <TableCell align="center">In stock</TableCell>
                    <TableCell align="center">Eeheidsprijs</TableCell>
                    <TableCell align="center">Totale prijs</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                    {b.PRODUCT.map((PRODUCTROW) => (
                      <TableRow key={PRODUCTROW.NAAM}>
                        <TableCell component="th" scope="row" align="right">
                          {PRODUCTROW.NAAM}
                        </TableCell>
                        <TableCell align="center">{PRODUCTROW.AANTAL}</TableCell>
                        <TableCell align="center">{PRODUCTROW.STOCK}</TableCell>
                        <TableCell align="center">{PRODUCTROW.EENHEIDSPRIJS}</TableCell>
                        <TableCell align="center">{PRODUCTROW.TOTALEPRIJS}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BestellingKlant;
