import React, { useEffect } from "react";
import useSWR, {mutate} from "swr";
import { useSWRConfig } from 'swr';
import { getAll } from "../api";
import BestellingList from "../components/BestellingList";
import { Box, CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

const BestellingenPage = () => {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll, {revalidateOnMount: true});


  if(isLoading){
    return <CircularProgress />;
  }

  return (
    <>
      <Box className='w-auto h-screen' sx={{bgcolor: grey[400], borderRadius: 1}}>
        <BestellingList bestellingen={bestellingen} />
      </Box>
    </>
  );
};

export default BestellingenPage;
