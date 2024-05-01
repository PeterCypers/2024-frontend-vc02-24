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
  
  console.log(bestelling);
  return (
    <>
      <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65'>
        {/* <Bestelling bestelling={bestelling} /> */}
      </Box>
    </>
  );
};

export default BestellingDetailPage;