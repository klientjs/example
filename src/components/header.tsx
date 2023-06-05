import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import klient from '../api';

function SwitchEnvLink(props: { name: 'ADMIN' | 'FRONT' }) {
  const { name } = props;
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const path = name === 'ADMIN' ? '/admin' : '/';

  return (name === 'ADMIN' && isAdmin) || (name === 'FRONT' && !isAdmin) ? (
    <span>
      <strong>{name}</strong>
    </span>
  ) : (
    <Link to={path} className="pm-text-primary">
      {name}
    </Link>
  );
}

function Header(): React.ReactElement {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const logout = () => klient.logout();
  const displayLogoutBtn = klient.jwt.isAuthenticated && location.pathname.startsWith('/admin');

  return (
    <header className="header pm-stacked">
      {/* Left side */}
      <Link to={isAdmin ? '/admin' : '/'} className="pm-h3 pm-no-margin">
        Klient JS
      </Link>

      {/* Right side */}
      <div className="d-flex">
        <span className="switch">
          <SwitchEnvLink name="FRONT" />
          <span>|</span>
          <SwitchEnvLink name="ADMIN" />
        </span>
        {displayLogoutBtn && (
          <button className="pm-btn-gradient logout" onClick={logout} type="button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
