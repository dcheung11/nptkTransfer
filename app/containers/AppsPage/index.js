import React, { memo, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AppsLanding from '../../components/Layouts/Apps/AppsLanding';
import { setToken } from '../../utils/auth';

function AppsPage() {
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  useEffect(() => {
    const setAuth0token = async () => {
      const domain = 'dev--vq7gpga.us.auth0.com';
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });
        setToken(accessToken);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
      }
    };
    setAuth0token().then(() => undefined);
  }, []);
  /* Get App Permissions */
  const [idClaims, setIdClaims] = useState({});
  useEffect(() => {
    const setAuth0IdClaims = async () => {
      try {
        const fetchedIdClaims = await getIdTokenClaims();
        setIdClaims(fetchedIdClaims);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
      }
    };
    setAuth0IdClaims().then(() => undefined);
  }, []);
  return (
    <AppsLanding
      user={user}
      roles={idClaims['https://magarveylab.ca/nptk/roles'] || []}
    />
  );
}

export default memo(AppsPage);
