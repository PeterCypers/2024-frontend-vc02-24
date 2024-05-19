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
    return <Box className='w-auto h-screen rounded-md'>Fout bij het laden van notificaties.</Box>;
  }

  if (!notificaties?.items?.length || isValidating) {
    if(notificaties.items.length === 0){
      return <Box className='w-auto h-screen rounded-md'></Box>;
    }
    return (
      <Box className='w-auto h-screen rounded-md' display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="h-full w-full rounded-md">
      <Box className='w-auto h-screen p-10'>
        <NotificatieList notificaties={notificaties.items} />
      </Box>
    </div>
  );
};

export default NotificatiePage;
