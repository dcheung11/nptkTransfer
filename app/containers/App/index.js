/* eslint-disable import/no-unresolved */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'hover.css';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LoadingFancy from '../../components/Miscellaneous/LoadingFancy';
import PuffinPage from '../../components/Layouts/Puffin/PuffinPage';
import QuincePage from '../../components/Layouts/Quince/QuincePage';
import Playground from '../../components/Miscellaneous/Playground';
import CropLanding from '../../components/Layouts/Crop/CropLanding';
import NotFoundPage from '../NotFoundPage/Loadable';
import AssemblyPage from '../../components/Layouts/Assembly/AssemblyPage';
import TargetPage from '../../components/Layouts/TargetPage';
import IbisPage from '../IbisPage';
import TaxonomyTreePage from '../TaxonomyTreePage';
// import test2 from '../test2';
import MultiLoginPage from '../MultiLoginPage';
import AppsPage from '../AppsPage';
import ProfilePassportPage from '../ProfilePassportPage';
import PrismPassportPage from '../PrismPassportPage';
import QuincePassportPage from '../QuincePassportPage';
import TaxonomyPassportPage from '../TaxonomyPassportPage';
import CropPassportPage from '../CropPassportPage';
import ExtractPassportPage from '../ExtractPassportPage';
import PlatePassportPage from '../MicroWellPlatePassportPage';
import SmallMoleculePassportPage from '../SmallMoleculePassportPage';

import PassportPage from '../PassportSearchPage';
import SmilesSearchResult from '../SmilesSearchResult';
import ActivitySearchResult from '../ActivitySearchResult';
import TargetSearchResult from '../TargetSearchResult';
import MoleculeNameSearchResult from '../MoleculeNameSearchResult';
import LeaderboardPage from '../LeaderboardPage';
import TaxonomyFormWithSubmission from '../TaxonomyFormWithSubmission';
import BearMolecule from '../../components/Chemistry/BearMolecule';
import ExampleCanvas from '../../components/Chemistry/RDKitMolecule';
import RDKitMol from '../../components/Chemistry/RDKitMolecule/display';

export default function App() {
  const Redir = () => <Redirect to="/" />;
  return (
    <div>
      <Helmet
        titleTemplate="%s - Magarvey Laboratories"
        defaultTitle="Innovation"
      >
        <meta name="description" content="Natural Product Toolkit" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={MultiLoginPage} />
        <Route path="/login/:entry" component={MultiLoginPage} />
        <Route
          exact
          path="/apps"
          component={withAuthenticationRequired(AppsPage)}
        />
        <Route
          exact
          path="/apps/profile"
          component={withAuthenticationRequired(ProfilePassportPage)}
        />
        <Route
          exact
          path="/apps/puffin"
          component={withAuthenticationRequired(PuffinPage)}
        />
        <Route
          exact
          path="/apps/quince"
          component={withAuthenticationRequired(QuincePage)}
        />
        <Route
          exact
          path="/apps/crops"
          component={withAuthenticationRequired(CropLanding)}
        />
        <Route
          exact
          path="/apps/assembly"
          component={withAuthenticationRequired(AssemblyPage)}
        />
        <Route
          exact
          path="/apps/passport"
          component={withAuthenticationRequired(PassportPage)}
        />

        <Route
          path="/apps/passport/search/smiles/:smilesStr*"
          component={withAuthenticationRequired(SmilesSearchResult)}
        />
        <Route
          path="/apps/passport/search/activity/:activityStr?"
          component={withAuthenticationRequired(ActivitySearchResult)}
        />
        <Route
          path="/apps/passport/search/target/:targetStr?"
          component={withAuthenticationRequired(TargetSearchResult)}
        />
        <Route
          path="/apps/passport/search/smallmolecule_name/:queryStr?"
          component={withAuthenticationRequired(MoleculeNameSearchResult)}
        />
        <Route
          exact
          path="/apps/target/:targetKey?"
          component={withAuthenticationRequired(TargetPage)}
        />
        <Route
          exact
          path="/apps/prism/results/:resultId?"
          component={withAuthenticationRequired(PrismPassportPage)}
        />
        <Route
          path="/apps/taxonomy/results/:taxonomyId"
          component={withAuthenticationRequired(TaxonomyPassportPage)}
        />
        <Route
          path="/apps/quince/results/:clusterId?"
          component={withAuthenticationRequired(QuincePassportPage)}
        />
        <Route
          path="/apps/crops/results/:cropId?"
          component={withAuthenticationRequired(CropPassportPage)}
        />
        <Route
          exact
          path="/apps/extract/results/:extractId?"
          component={withAuthenticationRequired(ExtractPassportPage)}
        />
        <Route
          exact
          path="/apps/plate/results/:plateId?"
          component={withAuthenticationRequired(PlatePassportPage)}
        />
        <Route
          exact
          path="/apps/smallMolecule/results/:smId?"
          component={withAuthenticationRequired(SmallMoleculePassportPage)}
        />
        <Route
          exact
          path="/apps/leaderboards"
          component={withAuthenticationRequired(LeaderboardPage)}
        />
        <Route path="/ibis" component={IbisPage} />
        <Route path="/smile" component={RDKitMol} />
        <Route path="/apps/taxonomy" component={TaxonomyTreePage} />
        <Route path="/nptk" component={Redir} />
        <Route exact path="/debug/loading" component={LoadingFancy} />
        <Route exact path="/debug/playground" component={Playground} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}
