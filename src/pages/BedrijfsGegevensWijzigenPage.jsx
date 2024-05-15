import React from 'react';
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById } from '../api';
import { Button, FormControl, InputLabel, Link } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export default function Wijzigen() {
  const methods = useForm();
  const { handleSubmit, register } = methods;

  // nog aan te passen
  // const handleWijzigen = useCallback(
  //   async ({ email, wachtwoord }) => {
  //     const loggedIn = await login(email, wachtwoord);

  //     if (loggedIn) {
  //       navigate({
  //         pathname: redirect,
  //         replace: true,
  //       });
  //     }
  //   },
  //   [login, navigate, redirect]
  // );

  return (
    <div>
      <h3>Bedrijf gegevens wijzigen</h3>
      <FormProvider {...methods}>
        <form
              onSubmit={handleSubmit()}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Bedrijfsnaam</InputLabel>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Sector</InputLabel>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Adres</InputLabel>
              </FormControl>
              <FormControl required variant="standard">
                <InputLabel htmlFor="email-input">E-mailadres</InputLabel>
                    {/* <OutlinedInput
                      id="email-input"
                      label="E-mailadres"
                      type="text"
                      sx={{ backgroundColor: "white" }}
                      {...register("email")}
                    /> */}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Telefoonnummer</InputLabel>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Rekeningnummer</InputLabel>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">BTW-nummer</InputLabel>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="text">Logo</InputLabel>
              </FormControl>
              <FormControl>
                  <Button
                    variant="contained"
                    type="submit"
                  >
                    Wijzigen
                  </Button>
              </FormControl>
        </form>
      </FormProvider>
    </div>
  );
};