import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.context";

import "./index.css";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";
import BestellingenPage from "./pages/BestellingenPage";
import ProfielPage from "./pages/ProfielPage";

import "@fontsource/comfortaa";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EF473C",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Comfortaa",
      textTransform: "none",
      fontWeight: "bold",
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
        element: <ProfielPage />,
      },
    ],
  },
  // {
  //   path: "/profiel",
  //   element: <ProfielPage />
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
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
