import React, { useMemo } from "react";
import useSWR from "swr";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { getAll } from "../api";
import SideMenu from "../components/SideMenu";

const ProfielPage = () => {
  const imageURL = "/public/images/backgroundTitle.png";

  const {
    data: notificaties = { items: [] },
    error,
    isLoading,
  } = useSWR('notificaties', () => getAll('notificaties'));

  const ongelezenNotificatiesCount = useMemo(() => { 
    if (isLoading) {
      return 0;
    }
    
    return notificaties.items.filter(n => n.NOTIFICATIESTATUS !== 'gelezen').length 
  }, [notificaties]);

  return (
    <div className="w-full h-full">
      <Box
        sx={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: 5,
          my: 2,
          width: '100%',
        }} id="profiel-title"
      >
        <h1 id="h1">Accountoverzicht</h1>
      </Box>
      <div className="px-4 flex flex-grow w-full h-full space-x-4" id="profiel-container">
        <div className="h-full w-fit mt-10 mr-10">
          <SideMenu ongelezenNotificatiesCount={ongelezenNotificatiesCount} />
        </div>
        <div className="h-full w-full mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfielPage;