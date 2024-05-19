import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/Auth.context";
import PrivateRoute from "./components/PrivateRoute";
import ProductPage from "./pages/ProductPage";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";


import "./index.css";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";
import BestellingenPage from "./pages/BestellingenPage";
import ProfielPage from "./pages/ProfielPage";
import BedrijfsGegevensPage from "./pages/BedrijfsGegevensPage";
import NotificatiePage from "./pages/NotificatiePage";
import BestellingDetailPage from "./pages/BestellingDetailPage";

import "@fontsource/comfortaa";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chatbox from "./components/chatBox/Chatbox";


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
      fontSize: 16,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/profiel',
            element: <ProfielPage />,
            children: [
              {
                path: "bestellingen",
                element: <BestellingenPage />,
              },
              {
                path: "bestellingen/:id",
                element: <BestellingDetailPage />,
              },
              {
                path: "notificaties",
                element: <NotificatiePage />,
              },
              {
                path: "bedrijfsgegevens",
                element: <BedrijfsGegevensPage />,
              },
              {
                path: "chat-geschiedenis",
                element: <Chatbox/>
              }
            ],
          },
        ],
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate replace to="/products"/>,  //als een leverancier naar welke pagina word je dan doorgestuurt als een pagina niet bestaat
  },
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
