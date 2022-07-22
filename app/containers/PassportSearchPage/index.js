import React, { memo } from 'react';
import PassportSearch from '../../components/Layouts/PassportSearch';

function PassportSearchLandingPage(props) {
  return (
    <PassportSearch
      numExtracts={22097}
      numGenomes={130915}
      numMolecules={49178}
      numGeneClusters={647831}
    />
  );
}

export default memo(PassportSearchLandingPage);
