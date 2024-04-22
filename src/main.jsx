import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.context";

import "./index.css";
import Test from "./pages/Test";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

import "@fontsource/comfortaa";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#EF473C",
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Comfortaa',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Test />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
