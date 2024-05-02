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
    <div className="grid grid-cols-2 gap-4 bg-white h-full w-full" id='gegevens-container'>
      <div>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2" style={{color: "#C32828"}}>{bedrijf.NAAM}</h1>
          <div id='bedrijfgegevensGridOne' className='grid grid-cols-2 gap-4'>
            <div className="text-red-950 font-bold">Sector:</div>
            <div>{bedrijf.SECTOR}</div>
            <div className="text-red-950 font-bold">Adres:</div>
            <div>{bedrijf.STRAAT} {bedrijf.STRAATNR} <br /> {bedrijf.STAD} {bedrijf.POSTCODE} {bedrijf.LAND}</div>
            <div id='bedrijfgegevensGridTwo' className='grid grid-cols-2 gap-4 col-span-2'>
              <div className="text-red-950 font-bold">Contactgegevens:</div>
              <div>{bedrijf.EMAILADRES} <br /> {bedrijf.TELEFOONNUMMER}</div>
              <div className="text-red-950 font-bold">Rekeningnummer:</div>
              <div>{bedrijf.REKENINGNUMMER}</div>
              <div className="text-red-950 font-bold">BTW-nummer:</div>
              <div>{bedrijf.BTWNR}</div>
            </div>
          </div>

        </div>
      </div>
      <div className="m-4 w-64">
        <img src={bedrijf.LOGO} alt="Image" className="w-full" />
      </div>
    </div>
  );
};

export default BedrijfsGegevensPage;