import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from './spinner';

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const AuthCheck = async () => {
      const user = localStorage.getItem('userid');

      if (user) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    AuthCheck();
  }, []);

  return ok ? <Outlet /> : <Spinner />;
}
