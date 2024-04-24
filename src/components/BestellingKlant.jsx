import React from "react";
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

const BestellingKlant = ({
  ORDERID,
  BETALINGSTATUS,
  BETALINGSDATUM,
  DATUMGEPLAATST,
  HERINNERINGSDATUM,
  ORDERSTATUS,
  klant: {
    KLANT_GEBRUIKERID,
    TELEFOONNUMMER,
    KLANT_EMAILADRES,
    LAND,
    POSTCODE,
    STAD,
    STRAAT,
    STRAATNR,
    KLANT_BEDRIJF_NAAM,
    KLANT_BEDRIJF_BTWNR,
    KLANT_BEDRIJF_ISACTIEF,
    KLANT_BEDRIJF_LOGO,
    KLANT_BEDRIJF_REKENINGNUMMER,
    KLANT_BEDRIJF_SECTOR,
  },
  leverancier: {
    LEVERANCIER_GEBRUIKERID,
    LEVERANCIER_EMAILADRES,
    LEVERANCIER_BEDRIJF_NAAM,
    LEVERANCIER_BEDRIJF_BTWNR,
    LEVERANCIER_BEDRIJF_ISACTIEF,
    LEVERANCIER_BEDRIJF_LOGO,
    LEVERANCIER_BEDRIJF_REKENINGNUMMER,
    LEVERANCIER_BEDRIJF_SECTOR,
  },
}) => {
  const [open, setOpen] = useState(false);
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
        <TableCell component="th" scope="row" align="center">
          {DATUMGEPLAATST}
        </TableCell>
        <TableCell align="center">{klant.KLANT_BEDRIJF_NAAM}</TableCell>{" "}
        {/* KLANT_GEBRUIKERID -> naar bedrijf naam geraken */}
        <TableCell align="center">{ORDERID}</TableCell>
        <TableCell align="center">{ORDERSTATUS}</TableCell>
        <TableCell align="center">{BETALINGSTATUS}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Gegevens
                <Grid container spacing={4}>
                  <Grid>
                    <Item>Betaalgegevens:</Item>
                  </Grid>
                  <Grid></Grid>
                  <Grid>
                    <Item>Totale bedrag:</Item>
                  </Grid>
                  <Grid>
                    <Item>{}</Item> {/*Totale prijs van alle producten */}
                  </Grid>
                  <Grid>
                    <Item align="right">Rekeningnummer:</Item>
                  </Grid>
                  <Grid>
                    <Item>
                      {leverancier.LEVERANCIER_BEDRIJF_REKENINGNUMMER}
                    </Item>
                  </Grid>
                  <Grid></Grid>
                  <Grid></Grid>
                  <Grid>
                    <Item align="right">BTW-nummer:</Item>
                  </Grid>
                  <Grid>
                    <Item>{leverancier.LEVERANCIER_BEDRIJF_BTWNR}</Item>
                  </Grid>
                  <Grid></Grid>
                  <Grid></Grid>
                  <Grid>
                    <Item>Leveradres:</Item>
                  </Grid>
                  <Grid>
                    <Item>{klant.LAND}</Item>
                    <Item>{klant.POSTCODE}</Item>
                    <Item>{klant.STAD}</Item>
                    <Item>{klant.STRAAT}</Item>
                    <Item>{klant.STRAATNR}</Item>
                    {/* bedrijf adres */}
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
