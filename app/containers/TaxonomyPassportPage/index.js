import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from '../../data/cactus/taxonomy/sagas';
import reducer from '../../data/cactus/taxonomy/reducers';
import limsSaga from '../../data/cactus/lims/sagas';
import limsReducer from '../../data/cactus/lims/reducers';

import {
  fetchTaxonomy,
  fetchChildren,
  fetchTaxMolecules,
  fetchParentStats,
  fetchCultureExtracts,
  fetchGenomeStats,
  fetchMetabologenomic,
} from '../../data/cactus/taxonomy/actions';

import {
  makeSelectChildNodes,
  makeSelectTax,
  makeSelectName,
  makeSelectChildLoading,
  makeSelectTaxonomyLoading,
  makeSelectTaxMolecules,
  makeSelectMolLoading,
  makeSelectRank,
  makeSelectNcbiId,
  makeSelectParentNodes,
  makeSelectParentLoading,
  makeSelectCultureLoading,
  makeSelectCultureExtracts,
  makeSelectGenomeLoading,
  makeSelectGenomeStats,
  makeSelectMetabologenomicHits,
} from '../../data/cactus/taxonomy/selectors';

import TaxonomyPassport from '../../components/Passports/TaxonomyPassport';
import {
  makeSelectCreateCultureLoading,
  makeSelectCreateExtractLoading,
} from '../../data/cactus/lims/selectors';

const key = 'taxonomy';

// eslint-disable-next-line no-unused-vars
function TaxonomyPassportPage(props) {
  useInjectSaga({ key, saga });
  useInjectSaga({ key: 'lims', saga: limsSaga });
  useInjectReducer({ key, reducer });
  useInjectReducer({ key: 'lims', reducer: limsReducer });

  /* Parse Taxonomy ID for downstream fetching */
  const { taxonomyId = props.taxonomyId } = useParams();

  /*
  Selecting Data from Store
  */
  const selectName = makeSelectName();
  const thisName = useSelector(selectName);

  const selectTax = makeSelectTax();
  const thisTax = useSelector(selectTax);

  const selectRank = makeSelectRank();
  const rank = useSelector(selectRank);

  const selectNcbi = makeSelectNcbiId();
  const ncbiId = useSelector(selectNcbi);

  const selectChildNodes = makeSelectChildNodes();
  const childNodes = useSelector(selectChildNodes);

  const selectParentNodes = makeSelectParentNodes();
  const parentNodes = useSelector(selectParentNodes);

  const selectChildLoading = makeSelectChildLoading();
  const childLoading = useSelector(selectChildLoading);

  const selectParentLoading = makeSelectParentLoading();
  const parentLoading = useSelector(selectParentLoading);

  const selectTaxonomyLoading = makeSelectTaxonomyLoading();
  const taxonomyLoading = useSelector(selectTaxonomyLoading);

  const selectMoleculeLoading = makeSelectMolLoading();
  const moleculeLoading = useSelector(selectMoleculeLoading);

  const selectTaxMolecules = makeSelectTaxMolecules();
  const taxMolecules = useSelector(selectTaxMolecules);

  const selectCultureLoading = makeSelectCultureLoading();
  const cultureLoading = useSelector(selectCultureLoading);

  const selectCultureExtracts = makeSelectCultureExtracts();
  const cultureExtracts = useSelector(selectCultureExtracts);

  const selectGenomeLoading = makeSelectGenomeLoading();
  const genomeLoading = useSelector(selectGenomeLoading);

  const selectGenomeStats = makeSelectGenomeStats();
  const genomeStats = useSelector(selectGenomeStats);

  const selectMetabologenomicHits = makeSelectMetabologenomicHits();
  const metabologenomicHits = useSelector(selectMetabologenomicHits);

  const selectCreateCultureLoading = makeSelectCreateCultureLoading();
  const createCultureLoading = useSelector(selectCreateCultureLoading);

  const selectCreateExtractLoading = makeSelectCreateExtractLoading();
  const createExtractLoading = useSelector(selectCreateExtractLoading);

  /*
  Setup Actions to Dispatch
   */
  const dispatch = useDispatch();

  /* Get App Permissions */
  const { getIdTokenClaims } = useAuth0();
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

  /*
  Fetch Taxonomy Metadata
  */
  const getTaxonomyData = value =>
    dispatch(
      fetchTaxonomy({
        taxonomyId: value,
        bearerToken: localStorage.token,
      }),
    );
  useEffect(() => {
    getTaxonomyData(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Fetch Taxonomy Child Nodes
  */
  const fetchChildNodes = value =>
    dispatch(
      fetchChildren({ taxonomyId: value, bearerToken: localStorage.token }),
    );
  useEffect(() => {
    fetchChildNodes(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Fetch Taxonomy Parent Nodes
  */
  const fetchParentNodes = value =>
    dispatch(
      fetchParentStats({ taxonomyId: value, bearerToken: localStorage.token }),
    );
  useEffect(() => {
    fetchParentNodes(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Fetch Taxonomy Metadata
  */
  const getTaxonomyMolecules = value =>
    dispatch(
      fetchTaxMolecules({
        taxonomyId: value,
        bearerToken: localStorage.token,
      }),
    );
  useEffect(() => {
    getTaxonomyMolecules(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Fetch Culture and Extracts Data
  */
  const getCultureExtracts = value =>
    dispatch(
      fetchCultureExtracts({
        taxonomyId: value,
        bearerToken: localStorage.token,
      }),
    );
  useEffect(() => {
    getCultureExtracts(taxonomyId);
    return undefined;
  }, [taxonomyId, createCultureLoading, createExtractLoading]);

  /*
  Fetch Taxonomy Metadata
  */
  const getGenomeStats = value =>
    dispatch(
      fetchGenomeStats({
        taxonomyId: value,
        bearerToken: localStorage.token,
      }),
    );
  useEffect(() => {
    getGenomeStats(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Fetch Taxonomy Metadata
  */
  const getMetabologenimicHits = value =>
    dispatch(
      fetchMetabologenomic({
        taxonomyId: value,
        bearerToken: localStorage.token,
      }),
    );
  useEffect(() => {
    getMetabologenimicHits(taxonomyId);
    return undefined;
  }, [taxonomyId]);

  /*
  Map Child Nodes into Items for Rendering
  */

  const passportSections = [
    {
      href: '#passport-details',
      title: 'Passport Details',
    },
    {
      href: '#cultures',
      title: 'Cultures & Extracts',
    },
    {
      href: '#known-small-molecules',
      title: 'Known Molecules',
    },
    {
      href: '#predicted-small-molecules',
      title: 'Predicted Molecules',
    },
    {
      href: '#genomes',
      title: 'Genomes',
    },
    {
      href: '#child-nodes',
      title: 'Child Nodes',
    },
  ];
  return (
    <TaxonomyPassport
      taxonomyId={taxonomyId}
      passportSections={passportSections}
      tax={
        thisTax || {
          kingdom: 'bacteria',
          kingdom_id: 1,
        }
      }
      name={thisName}
      rank={rank}
      ncbiId={ncbiId}
      childNodes={childNodes}
      parentNodes={parentNodes}
      taxMolecules={Object.values(taxMolecules)[0]}
      childLoading={childLoading}
      parentLoading={parentLoading}
      taxonomyLoading={taxonomyLoading}
      moleculeLoading={moleculeLoading}
      cultureLoading={cultureLoading}
      cultureExtracts={cultureExtracts}
      genomeLoading={genomeLoading}
      genomeStats={Object.values(genomeStats)[0]}
      metabologenomicHits={metabologenomicHits}
      permissions={
        idClaims['https://cactus.magarveylab.com/api/permissions'] || []
      }
    />
  );
}

TaxonomyPassportPage.propTypes = {
  taxonomyId: PropTypes.number,
};

export default withRouter(memo(TaxonomyPassportPage));
