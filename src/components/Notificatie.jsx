import React from "react";
import NotificatieKlant from "./NotificatieKlant";
import { useAuth } from "../contexts/Auth.context";

export default function Notificatie({ notificatie }) {
  const { gebruikerRol } = useAuth();

  // Render NotificatieKlant only for the 'KLANT' role
  if (gebruikerRol === "KLANT") {
    return <NotificatieKlant key={notificatie.NOTIFICATIEID} notificatie={notificatie} />;
  }

  return null;
}