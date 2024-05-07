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
      <div className="h-full w-full rounded-md">
        <Box className='w-auto h-screen p-10'>
          <BestellingList bestellingen={bestellingen} />
        </Box>
      </div>
        
    </>
  );
};

export default BestellingenPage;
