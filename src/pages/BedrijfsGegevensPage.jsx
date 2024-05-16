import React, { useState } from 'react';
import useSWR, { mutate } from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, save, updateBedrijfgegevens } from '../api';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const BedrijfsGegevensPage = () => {
  const { gebruikerId, loading } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    data: bedrijf,
    isLoading,
    error,
  } = useSWR(`bedrijfsgegevens/${gebruikerId}`, getById);

  const handleOpenEdit = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveData = async (data) => {
    await updateBedrijfgegevens(gebruikerId, {
      NAAM: data.NAAM, 
      BTWNR: data.BTWNR, 
      EMAILADRES: data.EMAILADRES, 
      LOGO: data.LOGO, 
      REKENINGNUMMER: data.REKENINGNUMMER, 
      SECTOR: data.SECTOR, 
      TELEFOONNUMMER: data.TELEFOONNUMMER, 
      LAND: data.LAND, 
      POSTCODE: data.POSTCODE, 
      STAD: data.STAD, 
      STRAAT: data.STRAAT, 
      STRAATNR: data.STRAATNR,
    });
    mutate();
  };

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-2 gap-6 w-full m-5">
      <div className="ml-5 mt-3">
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{color: "#C32828"}}>{bedrijf.NAAM}</h1>
          <div id='bedrijfgegevensGridOne' className='grid grid-cols-2 gap-4'>
            <div className="text-red-950 font-bold">Sector:</div>
            <div>{bedrijf.SECTOR}</div>
            <div className="text-red-950 font-bold">Adres:</div>
            <div>{bedrijf.STRAAT} {bedrijf.STRAATNR} <br /> {bedrijf.STAD} {bedrijf.POSTCODE} {bedrijf.LAND}</div>
            <div id='bedrijfgegevensGridTwo' className='grid grid-cols-2 gap-4 col-span-2'>
              <div className="text-red-950 font-bold">Contactgegevens:</div>
              <div>{bedrijf.EMAILADRES} <br /> {bedrijf.TELEFOONNUMMER}</div>
              <div className="text-red-950 font-bold">Rekeningnummer:</div>
              <div>{bedrijf.REKENINGNUMMER}</div>
              <div className="text-red-950 font-bold">BTW-nummer:</div>
              <div>{bedrijf.BTWNR}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-28 w-64">
        <img src={bedrijf.LOGO} alt="Image" />
      </div>
      <div className='ml-5'>
        <Button variant="contained" onClick={handleOpenEdit}>Gegevens wijzigen</Button>
      </div>
      <UpdateDialog open={dialogOpen} handleClose={handleCloseDialog} initialData={bedrijf} onSave={handleSaveData} />
    </div>
  );
};

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
    <Dialog maxWidth={'lg'} open={open} onClose={handleClose}>
      <DialogTitle>Bedrijf gegevens wijzigen</DialogTitle>
      <DialogContent>
        <div className='grid grid-cols-2 gap-3 w-fit'>
        <TextField
          margin="dense"
          label="Bedrijfsnaam"
          type="text"
          fullWidth
          variant="outlined"
          name="NAAM"
          value={formData.NAAM}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Sector"
          type="text"
          fullWidth
          variant="outlined"
          name="SECTOR"
          value={formData.SECTOR}
          onChange={handleChange}
        />
        <TextField className='col-span-2'
          margin="dense"
          label="Logo"
          type="url"
          fullWidth
          variant="outlined"
          name="LOGO"
          value={formData.LOGO}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="E-mailadres"
          type="email"
          fullWidth
          variant="outlined"
          name="EMAILADRES"
          value={formData.EMAILADRES}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Telefoonnummer"
          type="tel"
          fullWidth
          variant="outlined"
          name="TELEFOONNUMMER"
          value={formData.TELEFOONNUMMER}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Rekeningnummer"
          type="text"
          fullWidth
          variant="outlined"
          name="REKENINGNUMMER"
          value={formData.REKENINGNUMMER}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="BTW-nummer"
          type="text"
          fullWidth
          variant="outlined"
          name="BTWNR"
          value={formData.BTWNR}
          onChange={handleChange}
        />
        <TextField className='col-span-2'
          margin="dense"
          label="Straat"
          type="text"
          fullWidth
          variant="outlined"
          name="STRAAT"
          value={formData.STRAAT}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Volgnummer"
          type="number"
          fullWidth
          variant="outlined"
          name="STRAATNR"
          value={formData.STRAATNR}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Postcode"
          type="number"
          fullWidth
          variant="outlined"
          name="POSTCODE"
          value={formData.POSTCODE}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Stad"
          type="text"
          fullWidth
          variant="outlined"
          name="STAD"
          value={formData.STAD}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Land"
          type="text"
          fullWidth
          variant="outlined"
          name="LAND"
          value={formData.LAND}
          onChange={handleChange}
        />
        </div>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuleren</Button>
        <Button onClick={handleSave} color="primary">Opslaan</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BedrijfsGegevensPage;