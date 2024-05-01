import React from "react";
import { Box } from "@mui/material";
import NotificatieList from '../components/NotificatieList';
import mockNotificaties from '../components/MockData/notificaties';

const NotificatiePage = () => {
  return (
    <Box sx={{ width: "100%", height: "100%", borderRadius: 1 }}>
      <NotificatieList notificaties={mockNotificaties} />
    </Box>
  );
};

export default NotificatiePage;