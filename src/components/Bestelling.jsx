import * as React from "react";
import { useAuth } from "../contexts/Auth.context";
import useSWR from "swr";
import BestellingLeverancier from "./BestellingLeverancier";
import BestellingKlant from "./BestellingKlant";
import { getById } from "../api";

export default function Bestelling({ bestelling }) {
  const { gebruikerRol } = useAuth();

  // const {
  //   data: bestelling,
  //   isLoading,
  //   error,
  // } = useSWR("id", getById);

  if (gebruikerRol === "LEVERANCIER") {
    return (
      <BestellingLeverancier key={bestelling.ORDERID} bestelling={bestelling} />
    );
  }

  if (gebruikerRol === "KLANT") {
    return <BestellingKlant key={bestelling.ORDERID} bestelling={bestelling} />;
  }
}
