import React, { useEffect } from "react";
import useSWR, {mutate} from "swr";
import { useSWRConfig } from 'swr';
import { getAll } from "../api";
import { Box, CircularProgress } from "@mui/material";
import BestellingList from "../components/BestellingList";

const BestellingenPage = () => {
  const {
    data: bestellingen = [],
    isLoading,
    error,
  } = useSWR("bestellingen", getAll, {revalidateOnMount: true});

  //data komt twee keer binnen

  if(isLoading){
    return <CircularProgress />;
  }

  return (
    <>
      <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65'>
        <BestellingList bestellingen={bestellingen} />
      </Box>        
    </>
  );
};

export default BestellingenPage;
