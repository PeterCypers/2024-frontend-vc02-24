import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../contexts/Auth.context";
import LoginError from "../components/LoginError";
import {
  Backdrop,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { error, loading, login, isAuthed } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm();
  const { handleSubmit, register } = methods;

  const handleLogin = useCallback(
    async ({ email, wachtwoord }) => {
      await login(email, wachtwoord);
    },
    [login]
  );

  useEffect(() => {
    if (isAuthed)
      navigate({
        pathname: redirect,
        replace: true,
      });
  }, [isAuthed, navigate, redirect]);

  return (
    <div className="flex flex-col h-screen" id="login-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>

      <div>
        <img
          className="max-h-14 pl-48 mt-8"
          src="/images/Delaware-logo-black.png"
          alt="Delaware logo"
        />
      </div>

      <FormProvider {...methods}>
        <div className="flex h-full justify-center mb-24">
          <div className="flex flex-col flex-grow justify-center max-w-md m-4">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="delawareGrayBg rounded-lg px-5 py-3"
            >
              <div className="flex flex-col w-full space-y-10">
                <h1 className="text-4xl font-bold w-full text-center">
                  Inloggen
                </h1>

                <FormControl required variant="outlined">
                  <InputLabel htmlFor="email-input">E-mailadres</InputLabel>
                  <OutlinedInput
                    id="email-input"
                    label="E-mailadres"
                    type="text"
                    sx={{ backgroundColor: "white" }}
                    {...register("email")}
                  />
                </FormControl>

                <FormControl required variant="outlined">
                  <InputLabel htmlFor="wachtwoord-input">Wachtwoord</InputLabel>
                  <OutlinedInput
                    id="wachtwoord-input"
                    label="Wachtwoord"
                    type={showPassword ? "text" : "password"}
                    sx={{ backgroundColor: "white" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register("wachtwoord")}
                  />
                </FormControl>

                <LoginError error={error} />

                <FormControl>
                  <Button
                    className="w-32 self-center"
                    variant="contained"
                    type="submit"
                  >
                    Inloggen
                  </Button>
                </FormControl>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
