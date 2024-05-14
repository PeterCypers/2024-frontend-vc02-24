import React from "react";
import useSWR from "swr";
import { Box, CircularProgress } from "@mui/material";
import NotificatieList from '../components/NotificatieList';
import { getAll } from "../api/index"; 

const NotificatiePage = () => {
  const { data: notificaties = { items: [] }, error, isValidating } = useSWR('notificaties', getAll, {
    revalidateOnMount: true,
    revalidateOnFocus: true
  });

  if (error) {
    return <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65'>Fout bij het laden van notificaties.</Box>;
  }

  if (!notificaties?.items?.length || isValidating) {
    return (
      <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65' display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className='w-auto h-screen rounded-md bg-gray-400 bg-opacity-65'>
      <NotificatieList notificaties={notificaties.items} />
    </Box>
  );
};

export default NotificatiePage;
