import React, { useCallback, useState } from 'react';
import useSWR, {mutate} from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, save } from "../api";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';
import useSWRMutation from 'swr/mutation';

const GebruikersGegevensPage = () => {
  const { gebruikerId, loading } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    data: gebruiker,
    isLoading,
  } = useSWR(`gebruikers/${gebruikerId}`, getById);

  const handleOpenEdit = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-6 w-1/2 m-5 mt-8 pl-5">
      <div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#C32828" }}>{gebruiker.naam}</h1>
        <div id='gebruikersgegevensGrid' className='grid grid-cols-2 gap-4'>
          <div className="text-red-950 font-bold">Naam:</div>
          <div>{gebruiker.naam}</div>
          <div className="text-red-950 font-bold">E-mailadres:</div>
          <div>{gebruiker.email}</div>
        </div>
      </div>
      <div>
        <Button variant="contained" onClick={handleOpenEdit}>
          Gegevens wijzigen
        </Button>
      </div>
      <UpdateDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        initialData={gebruiker}
        id={gebruikerId}
      />
    </div>
  );
};

const UpdateDialog = ({ open, handleClose, initialData, id }) => {
  const [formData, setFormData] = useState(initialData);

  const {
    trigger: saveGebruiker,
    error: saveError,
  } = useSWRMutation(`gebruikers`, save);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveData = useCallback(
    async () => {
      try {
        await saveGebruiker({
          emailadres: formData.email,
          wachtwoord: formData.wachtwoord,
          naam: formData.naam,
          id: id,
        });
        mutate(`gebruikers/${id}`);
        handleClose();
      } catch (error) {

      }
    },
    [formData, id, saveGebruiker, saveError, handleClose]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Gegevens</DialogTitle>
      <DialogContent>
        <div className="flex flex-col space-y-3">
          <TextField
            margin="dense"
            label="Naam"
            type="text"
            fullWidth
            variant="outlined"
            name="naam"
            value={formData.naam}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="E-mailadres"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Wachtwoord"
            type="password"
            fullWidth
            variant="outlined"
            name="wachtwoord"
            value={formData.wachtwoord}
            onChange={handleChange}
          />
          <Typography className="text-red-600">
            {saveError ? "Alle velden moeten ingevuld zijn" : null}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuleren</Button>
        <Button className="order-last" onClick={handleSaveData} color="primary">Opslaan</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GebruikersGegevensPage;
