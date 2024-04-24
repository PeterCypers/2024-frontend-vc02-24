import * as React from "react";
import { useAuth } from "../contexts/Auth.context";
import BestellingLeverancier from "./BestellingLeverancier";
import BestellingKlant from "./BestellingKlant";

export default function Bestelling({ bestelling }) {
  const { gebruikerRol } = useAuth();

  if (gebruikerRol === "LEVERANCIER") {
    return <BestellingLeverancier key={bestelling.ORDERID} bestelling={bestelling} />;
  }

  if (gebruikerRol === "KLANT") {
    return <BestellingKlant key={bestelling.ORDERID} bestelling={bestelling} />;
  }
}
