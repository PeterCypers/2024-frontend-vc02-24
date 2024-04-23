import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.context';

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`;

  if (!ready) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}