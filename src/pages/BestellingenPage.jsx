import React from "react";
import { Box } from "@mui/material";
import BestellingList from "../components/BestellingList";


const BestellingenPage = () => {
  return (
    <div className="min-h-screen w-full rounded-md">
      <Box className='w-auto h-auto px-10 pt-7'>
        <BestellingList />
      </Box>

    </div>
  );
};

export default BestellingenPage;
