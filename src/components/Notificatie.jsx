import React from "react";
import NotificatieKlant from "./NotificatieKlant";
import NotificatieLeverancier from "./NotificatieLeverancier";
import { useAuth } from "../contexts/Auth.context";

export default function Notificatie({ notificatie }) {
  const { gebruikerRol } = useAuth();

  if (gebruikerRol === "LEVERANCIER") {
    return (
      <NotificatieLeverancier key={notificatie.NOTIFICATIEID} notificatie={notificatie} />
    );
  }

  if (gebruikerRol === "KLANT") {
    return (
      <NotificatieKlant key={notificatie.NOTIFICATIEID} notificatie={notificatie} />
    );
  }
}