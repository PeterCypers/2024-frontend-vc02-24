import React from 'react';
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { getById } from '../api';
import { Button, Link } from '@mui/material';

const BedrijfsGegevensPage = () => {
  const { gebruikerId, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    data: bedrijf,
    isLoading,
    error,
  } = useSWR(`bedrijfsgegevens/${gebruikerId}`, getById);

  if(isLoading){
    return <div>Loading...</div>
  }

  console.log(bedrijf);
  return (
    <div className="grid grid-cols-2 gap-6 w-full m-5">
      <div className="ml-5 mt-3">
        <div>
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
      <div className="ml-28 w-64">
        <img src={bedrijf.LOGO} alt="Image" />
      </div>
      <div className='ml-5'>
        <Button variant="contained" href='/profiel/bedrijfsgegevens/wijzigen'>Gegevens wijzigen</Button>
      </div>
    </div>
  );
};

export default BedrijfsGegevensPage;