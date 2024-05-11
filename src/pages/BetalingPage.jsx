import { Button } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";

const BetalingPage = () => {
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
          <Button variant="contained">Annuleren</Button>
          <Button variant="contained">Factuur downloaden</Button>
        </div>
      </div>
    </>
  );
};

export default BetalingPage;
