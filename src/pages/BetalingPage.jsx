import { Button } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import Factuur from "../components/Factuur";
import useSWR from "swr";
import { getById } from "../api";

const BetalingPage = () => {
  const { id } = useParams();

  const {
    data: bestelling,
    isLoading,
    error,
  } = useSWR(id ? `bestellingen/${id}` : null, getById);

  return (
    <>
      <div id="betaling" className="h-screen">
        <div className="flex-col place-content-between mx-auto w-min">
          <img
            className="mb-8 mt-10 min-w-96"
            src="/images/Delaware-logo.png"
            alt="Delaware logo"
          />
          <div className=" w-min mx-auto">
            <QRCode value="Bestelling betalen..." size={250} />
          </div>
        </div>
        <div className="flex flex-row mt-10 justify-around w-screen">
          <Button variant="contained">
            <Link to={"/profiel/bestellingen"}>Annuleren</Link>
          </Button>
          <Factuur bestelling={bestelling} />
        </div>
      </div>
    </>
  );
};

export default BetalingPage;
