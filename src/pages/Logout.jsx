import { useEffect } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { Link, useLocation } from "react-router-dom";

export default function Logout() {
  const { isAuthed, logout } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const manueelLogout = queryParams.get('manueel');

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <div>
        <div className='m-4'>
          <h1>Uitloggen...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='m-4'>
      <span>{manueelLogout === "true" ? "Je werd succesvol uitgelogd. " : "De sessie is verlopen. "}</span>
      <Link to="/" className="text-blue underline">
        <span>Terugkeren</span>
      </Link>
    </div>
  );
}