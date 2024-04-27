import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const BestellingKlant = ({ bestelling }) => {
  const [open, setOpen] = useState(false);

  const {
    DATUMGEPLAATST,
    ORDERID,
    ORDERSTATUS,
    BETALINGSTATUS,
    klant,
    leverancier,
  } = bestelling;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{DATUMGEPLAATST}</TableCell>
        <TableCell align="center">{klant.KLANT_BEDRIJF_NAAM}</TableCell>
        <TableCell align="center">{ORDERID}</TableCell>
        <TableCell align="center">{ORDERSTATUS}</TableCell>
        <TableCell align="center">{BETALINGSTATUS}</TableCell>
      </TableRow>
    </>
  );
};

export default BestellingKlant;
