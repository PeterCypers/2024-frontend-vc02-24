import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
// import Test from "./pages/Test";
import BestellingPage from "./pages/BestellingPage";
import ProfielPage from "./pages/ProfielPage";

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
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
