import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from 'react-router-dom';

const Spinner = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true); // Set redirect to true after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex justify-center items-center h-screen gap-3">
      <p className="text-2xl font-bold">Checking Authorization</p>
      <CircularProgress className="text-blue-500" />
    </div>
  );
};

export default Spinner;
