import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import React, { useState } from "react";

function BestellingFilterDialog({ dialogOpen, handleDialogClose, handleSubmit }) {

  const [datum, setDatum] = useState('');
  const [naam, setNaam] = useState('');
  const [orderId, setOrderid] = useState('');
  const [orderstatus, setOrderstatus] = useState('');
  const [betalingstatus, setBetalingstatus] = useState('');

  const removeSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const handleSubmitChanges = () => {
    const result = [datum, naam, orderId, orderstatus, betalingstatus].map(str => removeSpaces(str));
    handleSubmit(result);
    handleDialogClose();
  };

  return <Dialog
    open={dialogOpen}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogContent className="flex flex-col space-y-4">
      <TextField
        label="Datum"
        variant="outlined"
        onChange={(e) => setDatum(e.target.value)}
      />
      <TextField
        label="Naam"
        variant="outlined"
        onChange={(e) => setNaam(e.target.value)}
      />
      <TextField
        label="Order id"
        variant="outlined"
        onChange={(e) => setOrderid(e.target.value)}
      />
      <TextField
        label="Orderstatus"
        variant="outlined"
        onChange={(e) => setOrderstatus(e.target.value)}
      />
      <TextField
        label="Betalingstatus"
        variant="outlined"
        onChange={(e) => setBetalingstatus(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button
        type="submit"
        onClick={handleSubmitChanges}
      >
        Toepassen
      </Button>
    </DialogActions>
  </Dialog>
}

export default BestellingFilterDialog;