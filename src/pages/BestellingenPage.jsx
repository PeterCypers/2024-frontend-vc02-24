import React from "react";
import useSWR from "swr";
import { getAll } from "../api";
import BestellingList from "../components/BestellingList";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const BestellingenPage = () => {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll);
  
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          backgroundColor: grey[400],
        }}
      >
        <BestellingList bestellingen={bestellingen} />
      </Box>
    </>
  );
};

export default BestellingenPage;
