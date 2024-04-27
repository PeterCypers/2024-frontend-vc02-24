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

const BestellingLeverancier = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, HERINNERINGSDATUM, klant } = bestelling;

  // Define the background color dynamically based on the open state
  const topRowStyle = {
    "& > *": { borderBottom: "unset" },
    backgroundColor: open ? "rgba(217,119,119)" : "inherit", // Darker red when expanded
    transition: "background-color 0.3s ease-in-out",
  };

  // Style for the expanded details part
  const detailRowStyle = {
    "& > *": { borderBottom: "unset" },
    backgroundColor: open ? "rgba(255, 70, 70, 0.2)" : "inherit", // Lighter red when expanded
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <>
      <TableRow sx={topRowStyle}>
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
        <TableCell align="center">{klant.KLANT_BEDRIJF_NAAM}</TableCell>
        <TableCell align="center">{ORDERID}</TableCell>
        <TableCell align="center">{ORDERSTATUS}</TableCell>
        <TableCell align="center">{BETALINGSTATUS}</TableCell>
      </TableRow>
      <TableRow sx={detailRowStyle}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 5 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Grid 
                  container
                  spacing={3}
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Contactgegevens:</Typography>
                    <div>{klant.KLANT_EMAILADRES}</div>
                    <div>{klant.TELEFOONNUMMER}</div>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Totale bedrag:</Typography>
                    <div>{klant.totalAmount || 'N/A'}</div>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Leveradres:</Typography>
                    <div>{klant.LAND}</div>
                    <div>{klant.POSTCODE}</div>
                    <div>{klant.STAD}</div>
                    <div>{klant.STRAAT}</div>
                    <div>{klant.STRAATNR}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Betalingsherinnering:</Typography>
                    <div>{HERINNERINGSDATUM}</div>
                  </Grid>
                </Grid>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BestellingLeverancier;