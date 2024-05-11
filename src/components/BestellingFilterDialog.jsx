import { Button, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material";
import React, { useCallback } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

function BestellingFilterDialog({ handleSubmit }) {

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [datum, setDatum] = React.useState('');
  const [naam, setNaam] = React.useState('');
  const [orderId, setOrderid] = React.useState('');
  const [orderstatus, setOrderstatus] = React.useState('');
  const [betalingstatus, setBetalingstatus] = React.useState('');

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmitChanges = useCallback(() => {
    handleSubmit({datum, naam, orderId, orderstatus, betalingstatus});
    handleDialogClose();
  }, [datum, naam, orderId, orderstatus, betalingstatus]);

  return <>
    <IconButton
      onClick={handleDialogOpen}
    >
      <FilterListIcon />
    </IconButton>

    <Dialog
      fullScreen={fullScreen}
      open={dialogOpen}
      onClose={handleDialogClose}
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

  </>
}

export default BestellingFilterDialog;