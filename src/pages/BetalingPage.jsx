import { Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import Factuur from "../components/Factuur";
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById, post } from "../api";

const fetcher = (url) => getById(url);

const BetalingPage = () => {
  const { id } = useParams();
  const { isAuthed } = useAuth();

  const {
    data: bestelling
  } = useSWR(isAuthed && id ? `bestellingen/${id}` : null, fetcher);

  const createBetaling = useCallback(async () => {
    try {
      await post("betaling", { arg: { ORDERID: id } });
    } catch (error) {
      console.log("Failed to save data: ", error);
    }
  }, [id]);

  useEffect(() => {
    if (!id || !isAuthed) {
      return;
    }

    createBetaling();
  }, [id, isAuthed]);

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
