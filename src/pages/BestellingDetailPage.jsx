import React from "react";
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { getById } from "../api";
import { Box, CircularProgress } from "@mui/material";
import Bestelling from "../components/Bestelling";

const BestellingDetailPage = () => {
  const { id } = useParams();

  const {
    data: bestelling,
    isLoading, 
    error,
  } = useSWR(id ? `bestellingen/${id}` : null, getById);

  if(isLoading){
    return <CircularProgress />;
  }

  return (
    <>
      <Box className='w-auto h-full rounded-md'>
        <Bestelling bestelling={bestelling} />
      </Box>
    </>
  );
};

export default BestellingDetailPage;