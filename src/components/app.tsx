import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import klient from '../api';
import Header from './header';

function App(): React.ReactElement {
  const [, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const login = () => setIsAuth(true);

  const logout = () => {
    klient.cancelPendingRequests();
    setIsAuth(false);
    navigate('/admin');
  };

  useEffect(() => {
    klient.on('jwt:logout', logout, -1000);
    klient.on('jwt:login', login, -1000);

    setIsAuth(klient.jwt.isCredentialsExpired === false);
  }, []);

  return (
    <div className="plume">
      <Header />
      <div className="plume pm-container app">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
