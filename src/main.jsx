import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import { RouterProvider, createBrowserRouter,Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";


import "./index.css";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/products"/>,

      },
      {
        path: "/products",
        element: <ProductList />,
      },
    ],
  },
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
