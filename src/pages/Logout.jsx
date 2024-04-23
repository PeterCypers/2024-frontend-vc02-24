import { useEffect } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { Link } from "react-router-dom";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

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
      <span>Je werd succesvol uitgelogd. </span>
      <Link to="/" className="text-blue underline">
        <span>Terugkeren</span>
      </Link>
    </div>
  );
}