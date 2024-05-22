import React, { useCallback, useState } from "react";
import useSWR, {mutate} from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, save } from "../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import useSWRMutation from "swr/mutation";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full px-10 pt-7">
      <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-6">
        <div>
          <h2>{bedrijf.NAAM}</h2>
          <div className='md:grid grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 gap-4'>
            <div className="text-red-950 font-bold">Sector:</div>
            <div className="col-span-2">{bedrijf.SECTOR}</div>
            <div className="text-red-950 font-bold">Adres:</div>
            <div className="col-span-2">
              <div>{bedrijf.STRAAT} {bedrijf.STRAATNR}</div>
              <div>{bedrijf.POSTCODE} {bedrijf.STAD} {bedrijf.LAND}</div>
            </div>
            <div className="text-red-950 font-bold">Contactgegevens:</div>
            <div className="col-span-2">
              <div>{bedrijf.EMAILADRES}</div>
              <div>{bedrijf.TELEFOONNUMMER}</div>
            </div>
            <div className="text-red-950 font-bold">Rekeningnummer:</div>
            <div className="col-span-2">{bedrijf.REKENINGNUMMER}</div>
            <div className="text-red-950 font-bold">BTW-nummer:</div>
            <div className="col-span-2">{bedrijf.BTWNR}</div>
          </div>
        </div>
        <div className="ml-28 w-64">
          <img src={bedrijf.LOGO} alt="Image" />
        </div>
      </div>
      <div className="mt-8">
        <Button variant="contained" onClick={handleOpenEdit}>
          Gegevens wijzigen
        </Button>
      </div>
      <UpdateDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        initialData={bedrijf}
        id={gebruikerId}
      />
    </div>
  );
};

const UpdateDialog = ({ open, handleClose, initialData, id }) => {
  const [formData, setFormData] = useState(initialData);

  const {
    trigger: saveBedrijf,
    error: saveError,
  } = useSWRMutation(`bedrijfsgegevens`, save);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveData = useCallback(
    async () => {
      try{
        await saveBedrijf({
          naam: formData.NAAM,
          btwNr: formData.BTWNR,
          emailadres: formData.EMAILADRES,
          logo: formData.LOGO,
          rekeningnummer: formData.REKENINGNUMMER,
          sector: formData.SECTOR,
          telefoonnummer: formData.TELEFOONNUMMER,
          land: formData.LAND,
          postcode: formData.POSTCODE,
          stad: formData.STAD,
          straat: formData.STRAAT,
          straatnr: formData.STRAATNR,
          id: id,
        });
        mutate(`bedrijfsgegevens/${id}`);
        handleClose()
      } catch(error){

      }
    },
    [formData, id, saveBedrijf, saveError, handleClose]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="text-red-600 font-extrabold text-2xl">Bedrijf gegevens wijzigen</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2 gap-3 w-fit">
          <TextField
            margin="dense"
            label="Bedrijfsnaam"
            type="text"
            fullWidth
            required
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
            required
            variant="outlined"
            name="SECTOR"
            value={formData.SECTOR}
            onChange={handleChange}
          />
          <TextField
            className="col-span-2"
            margin="dense"
            label="Logo"
            type="url"
            fullWidth
            required
            variant="outlined"
            name="LOGO"
            value={formData.LOGO}
            onChange={handleChange}
          />
          <TextField
            className="col-span-2"
            margin="dense"
            label="E-mailadres"
            type="email"
            fullWidth
            required
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
            required
            variant="outlined"
            name="TELEFOONNUMMER"
            value={formData.TELEFOONNUMMER}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="BTW-nummer"
            type="text"
            fullWidth
            required
            variant="outlined"
            name="BTWNR"
            value={formData.BTWNR}
            onChange={handleChange}
          />
          <TextField
            className="col-span-2"
            margin="dense"
            label="Rekeningnummer"
            type="text"
            fullWidth
            required
            variant="outlined"
            name="REKENINGNUMMER"
            value={formData.REKENINGNUMMER}
            onChange={handleChange}
          />
          <TextField
            className="col-span-2"
            margin="dense"
            label="Straat"
            type="text"
            fullWidth
            required
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
            required
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
            required
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
            required
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
            required
            variant="outlined"
            name="LAND"
            value={formData.LAND}
            onChange={handleChange}
          />
          <Typography className="text-red-600">
            {saveError ? "Alle velden moeten ingevuld zijn" : null}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className="w-full">
        <div className="flex justify-between w-full">
          <Button onClick={handleClose}>Annuleren</Button>
          <Button className="order-last" onClick={handleSaveData} color="primary">
            Opslaan
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default BedrijfsGegevensPage;
