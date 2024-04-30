import React from "react";
import { useParams } from 'react-router-dom';
import useSWR from "swr";
import { getById } from "../api";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Bestelling from "../components/Bestelling";

const BestellingDetailPage = () => {
  const { id } = useParams();

  const {
    data: bestelling,
    isLoading, 
    error,
  } = useSWR(id ? `bestellingen/${id}` : null, getById);
  
  console.log(bestelling);
  return (
    <>
      <Box className='w-auto h-screen' sx={{bgcolor: grey[400], borderRadius: 1}}>
        {/* <Bestelling bestelling={bestelling} /> */}
      </Box>
    </>
  );
};

export default BestellingDetailPage;