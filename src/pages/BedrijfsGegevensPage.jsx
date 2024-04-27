import React from 'react';
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById } from '../api';
//gebruikerRol === "LEVERANCIER"
const BedrijfsGegevensPage = () => {
  const { gebruikerRol, gebruikerId, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  let getRequestString = "";
  switch (gebruikerRol) {
    case "LEVERANCIER": getRequestString = `levcompanydetails/${gebruikerId}`;
      break;
    case "KLANT": getRequestString = `cstcompanydetails/${gebruikerId}`;
      break;
    default:
      break;
  }
  
  const {
    data: bedrijf,
    isLoading,
    error,
  } = useSWR(`${getRequestString}`, getById);

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className=" p-4">
          <h1 className="text-2xl font-bold mb-2" style={{color: "#C32828"}}>{bedrijf.NAAM}</h1>
          <div id='bedrijfgegevensGridOne' className='grid grid-cols-2 gap-4'>
            <div class='darkRedGegevens'>Sector:</div>
            <div>{bedrijf.SECTOR}</div>
            <div class='darkRedGegevens'>Adres:</div>
            <div>{bedrijf.STRAAT} {bedrijf.STRAATNR} <br /> {bedrijf.STAD} {bedrijf.POSTCODE} {bedrijf.LAND}</div>
            <div id='bedrijfgegevensGridTwo' className='grid grid-cols-2 gap-4 col-span-2'>
              <div class='darkRedGegevens'>Contactgegevens:</div>
              <div>{bedrijf.EMAILADRES} <br /> {bedrijf.TELEFOONNUMMER}</div>
              <div class='darkRedGegevens'>Rekeningnummer:</div>
              <div>{bedrijf.REKENINGNUMMER}</div>
              <div class='darkRedGegevens'>BTW-nummer:</div>
              <div>{bedrijf.BTWNR}</div>
            </div>
          </div>

        </div>
      </div>
      <div className="p-4 w-56">
        <img src={bedrijf.LOGO} alt="Image" className="w-full" />
      </div>
      <div className="h-8 col-span-2 min-h-24">
          <img src="../../public/images/delawareFooter2.png" alt="Footer" className='h-24' style={{minWidth: "52rem"}} />
      </div>
    </div>
  );
};

export default BedrijfsGegevensPage;