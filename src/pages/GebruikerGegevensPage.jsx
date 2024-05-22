import React, { useCallback, useState } from 'react';
import useSWR, { mutate } from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, save } from "../api";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import useSWRMutation from 'swr/mutation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
    <div className="min-h-screen w-full px-10 pt-7">
      <h2>Gegevens</h2>
      <div className='grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
        <div className="text-red-950 font-bold">Naam:</div>
        <div className='col-span-4'>{gebruiker.naam}</div>
        <div className="text-red-950 font-bold">E-mailadres:</div>
        <div className='col-span-4'>{gebruiker.email}</div>
      </div>
      <div className='mt-8'>
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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="text-red-600 font-extrabold text-2xl">Update Gegevens</DialogTitle>
      <DialogContent>
        <div className="flex flex-col space-y-3 w-fit">
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
            label="Wachtwoord"
            variant="outlined"
            name="wachtwoord"
            type={showPassword ? "text" : "password"}
            sx={{ backgroundColor: "white", color: "#FFFFFF" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.wachtwoord}
            onChange={handleChange}
          />
          <Typography className="text-red-600">
            {saveError ? "Alle velden moeten ingevuld zijn" : null}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className='w-full'>
        <div className='flex justify-between w-full'>
          <Button onClick={handleClose}>Annuleren</Button>
          <Button className="order-last" onClick={handleSaveData} color="primary">Opslaan</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default GebruikersGegevensPage;
