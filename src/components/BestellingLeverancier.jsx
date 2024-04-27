import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const BestellingLeverancier = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const { DATUMGEPLAATST, ORDERID, ORDERSTATUS, BETALINGSTATUS, HERINNERINGSDATUM, klant } = bestelling;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row" align="center">
          {DATUMGEPLAATST}
        </TableCell>
        <TableCell align="center">{klant.KLANT_BEDRIJF_NAAM}</TableCell>
        <TableCell align="center">{ORDERID}</TableCell>
        <TableCell align="center">{ORDERSTATUS}</TableCell>
        <TableCell align="center">{BETALINGSTATUS}</TableCell>
      </TableRow>
    </>
  );
};

export default BestellingLeverancier;
