import React from "react";
import { Box } from "@mui/material";
import BestellingList from "../components/BestellingList";

const BestellingenPage = () => {
  return (
    <div className="h-full w-full rounded-md">
      <Box className='w-auto h-screen p-10'>
        <BestellingList />
      </Box>
    </div>
  );
};

export default BestellingenPage;
