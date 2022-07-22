import React, { memo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePassport from '../../components/Passports/ProfilePassport';

function ProfilePassportPage() {
  const { user } = useAuth0();
  return <ProfilePassport user={user} />;
}

export default memo(ProfilePassportPage);
