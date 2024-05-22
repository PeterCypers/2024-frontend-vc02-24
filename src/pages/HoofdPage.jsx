import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatFloatingButton from "../components/ChatFloatingButton";

export default function HoofdPage() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ChatFloatingButton />
      <Footer />
    </>
  );
};
