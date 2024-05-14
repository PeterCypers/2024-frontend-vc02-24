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
        </form>
      </FormProvider>
    </div>
  );
};