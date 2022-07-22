import React, { memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingHeader from '../../components/Layouts/Header';

function LogoutHeader() {
  const { user, logout } = useAuth0();
  return (
    <LandingHeader
      style={{ backgroundColor: '#323232' }}
      appName="NPTK"
      logoutFunction={() =>
        logout({ returnTo: `${window.location.origin}/nptk` })
      }
      user={user}
    />
  );
}

export default memo(LogoutHeader);
