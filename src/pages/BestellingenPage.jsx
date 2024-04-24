import React from "react";
import useSWR from "swr";
import { getAll } from "../api";
import BestellingList from "../components/BestellingList";

const BestellingenPage = () => {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll);

  return (
    <>
      <BestellingList bestellingen={bestellingen} />
    </>
  );
};

export default BestellingenPage;
