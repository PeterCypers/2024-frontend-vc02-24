import React from "react";
import { Box } from "@mui/material";
import NotificatieList from '../components/NotificatieList';
import mockNotificaties from '../components/MockData/notificaties';

const NotificatiePage = () => {
  return (
    <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65'>
      <NotificatieList notificaties={mockNotificaties} />
    </Box>
  );
};

export default NotificatiePage;