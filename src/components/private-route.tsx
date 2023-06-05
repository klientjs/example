import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import klient from '../api';

function PrivateRoute(): React.ReactElement | null {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('/admin') === 0 && !klient.jwt?.isAuthenticated) {
      klient.logout().then(() => {
        navigate('/admin', {
          state: {
            from: location.pathname
          }
        });
      });

      return;
    }

    setAuthorized(true);
  }, []);

  return authorized ? <Outlet /> : null;
}

export default PrivateRoute;
