import React, { useState } from 'react';
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, updateGebruiker } from '../api';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UpdateDialog = ({ open, handleClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
      onSave(formData);
      handleClose();
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Gegevens</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuleren</Button>
          <Button onClick={handleSave} color="primary">Opslaan</Button>
        </DialogActions>
      </Dialog>
    );
};

const GebruikersGegevensPage = () => {
    const { gebruikerId } = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
      data: gebruiker,
      mutate,
      isLoading,
    } = useSWR(`gebruikers/${gebruikerId}`, getById);

    const handleOpenEdit = () => {
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const handleSaveData = async (data) => {
      await updateGebruiker(gebruikerId, {
        EMAILADRES: data.email,
        WACHTWOORD: data.wachtwoord,
        NAAM: data.naam,
        ROL: gebruiker.rol, 
        ISACTIEF: gebruiker.isActief 
      });
      mutate(); 
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="grid grid-cols-2 gap-6 h-full w-full p-5">
        <div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2" style={{color: "#C32828"}}>{gebruiker.naam}</h1>
            <div id='gebruikersgegevensGrid' className='grid grid-cols-2 gap-4'>
              <div className="text-red-950 font-bold">Naam:</div>
              <div>{gebruiker.naam} <IconButton onClick={handleOpenEdit}><EditIcon /></IconButton></div>
              <div className="text-red-950 font-bold">E-mailadres:</div>
              <div>{gebruiker.email} <IconButton onClick={handleOpenEdit}><EditIcon /></IconButton></div>
              <div className="text-red-950 font-bold">Wachtwoord:</div>
              <div>{gebruiker.wachtwoord} <IconButton onClick={handleOpenEdit}><EditIcon /></IconButton></div>
            </div>
          </div>
        </div>
        <UpdateDialog open={dialogOpen} handleClose={handleCloseDialog} initialData={gebruiker} onSave={handleSaveData} />
      </div>
    );
};

export default GebruikersGegevensPage;
