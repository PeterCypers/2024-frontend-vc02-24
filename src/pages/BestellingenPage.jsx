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
      <Box className='w-auto h-screen' sx={{bgcolor: grey[400], borderRadius: 1}}>
        <BestellingList bestellingen={bestellingen} />
      </Box>
    </>
  );
};

export default BestellingenPage;
