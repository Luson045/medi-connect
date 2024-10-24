import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Spinner from './spinner';
import { UserContext } from '../store/userContext'; // Import the UserContext

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useContext(UserContext); // Get auth and loading state from context

  // While checking authentication (loading), show Spinner
  if (loading) {
    return <Spinner />;
  }

  // If authenticated, show the protected route, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
