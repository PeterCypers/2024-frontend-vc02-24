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
        <div className="flex flex-col justify-between justify-items-center mx-auto w-min gap-36">
          <img
            className="mb-8 mt-10 min-w-96"
            src="/images/Delaware-logo.png"
            alt="Delaware logo"
          />
          <div className="w-min mx-auto">
            <QRCode value="Bestelling betalen..." size={250} />
          </div>
        </div>
        <div className="grid grid-cols-2 absolute bottom-28 w-screen">
          <div className="justify-self-start mx-32">
            <Button variant="contained">
              <Link to={"/profiel/bestellingen"}>Terug</Link>
            </Button>
          </div>
          <div className="justify-self-end mx-32">
            <Factuur bestelling={bestelling} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BetalingPage;
