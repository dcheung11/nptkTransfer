import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import smallMoleculeReducer from '../../data/cactus/smallmolecule/reducers';
import smallMoleculeSaga from '../../data/cactus/smallmolecule/sagas';
import SmilesSearchResultLayout from '../../components/SearchResultLayouts/SmilesSearchResultLayout';
import {
  fetchIdentity,
  fetchSimilarity,
  fetchSmilesSubstructures,
  fetchSmallmoleculeMeta,
} from '../../data/cactus/smallmolecule/actions';
import {
  makeSelectIdentityLoading,
  makeSelectIdentity,
  makeSelectMetadataLoading,
  makeSelectMetadata,
  makeSelectSimilarityLoading,
  makeSelectSimilarity,
  makeSelectSubstructureLoading,
  makeSelectSubstructures,
} from '../../data/cactus/smallmolecule/selectors';

function SmilesSearchResult(props) {
  useInjectReducer({ key: 'smallmolecule', reducer: smallMoleculeReducer });
  useInjectSaga({ key: 'smallmolecule', saga: smallMoleculeSaga });
  const { smilesStr } = useParams();
  const paginationPageSize = 5;
  const dispatch = useDispatch();

  /* Selectors Data for Render */
  const selectIdentityLoading = makeSelectIdentityLoading();
  const identityLoading = useSelector(selectIdentityLoading);
  const selectIdentity = makeSelectIdentity();
  const identity = useSelector(selectIdentity);

  const selectSimilarityLoading = makeSelectSimilarityLoading();
  const similarityLoading = useSelector(selectSimilarityLoading);
  const selectSimilarity = makeSelectSimilarity();
  const similarity = useSelector(selectSimilarity);

  const selectSubstructureLoading = makeSelectSubstructureLoading();
  const substructureLoading = useSelector(selectSubstructureLoading);
  const selectSubstructures = makeSelectSubstructures();
  const substructures = useSelector(selectSubstructures);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);
  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  /* Fetch of Data Across Diff domains */

  useEffect(() => {
    dispatch(
      fetchIdentity({
        bearerToken: localStorage.token,
        smiles: smilesStr,
        numLimit: 'null',
        numOffset: 'null',
      }),
    );
    return undefined;
  }, [smilesStr]);

  useEffect(() => {
    dispatch(
      fetchSimilarity({
        bearerToken: localStorage.token,
        smiles: smilesStr,
        numLimit: 'null',
        numOffset: 'null',
      }),
    );
    return undefined;
  }, [smilesStr]);

  useEffect(() => {
    dispatch(
      fetchSmilesSubstructures({
        bearerToken: localStorage.token,
        smiles: smilesStr,
        numLimit: 'null',
        numOffset: 'null',
      }),
    );
    return undefined;
  }, [smilesStr]);

  /* Functions for Pagination */
  function fetchMeta(page, pageSize, hits, metadata) {
    const hitIds = Object.values(hits)
      .slice((page - 1) * pageSize, page * pageSize)
      .map(x => x.smallmolecule_id);
    const difference = hitIds.filter(
      x => !Object.keys(metadata).includes(x.toString()),
    );
    // eslint-disable-next-line no-unused-expressions
    difference.length > 0 &&
      dispatch(
        fetchSmallmoleculeMeta({
          bearerToken: localStorage.token,
          smIds: difference,
        }),
      );
    return undefined;
  }

  /* Fetch Metadata for Matches */

  /* Identity */
  useEffect(() => fetchMeta(1, paginationPageSize, identity, metadata), [
    identity,
  ]);
  useEffect(() => fetchMeta(1, paginationPageSize, similarity, metadata), [
    similarity,
  ]);
  useEffect(() => fetchMeta(1, paginationPageSize, substructures, metadata), [
    substructures,
  ]);
  return (
    <SmilesSearchResultLayout
      smilesStr={smilesStr}
      pageSize={paginationPageSize}
      metadataLoading={metadataLoading}
      metadata={metadata}
      // Identity
      identityLoading={identityLoading}
      identityPagination={(page, pageSize) =>
        fetchMeta(page, pageSize, identity, metadata)
      }
      identity={Object.values(identity)}
      identityTotal={Object.values(identity).length}
      // Similarity
      similarityLoading={similarityLoading}
      similarityPagination={(page, pageSize) =>
        fetchMeta(page, pageSize, similarity, metadata)
      }
      similarity={Object.values(similarity)}
      similarityTotal={Object.values(similarity).length}
      // Substuctures
      substructures={Object.values(substructures)}
      substructurePagination={(page, pageSize) =>
        fetchMeta(page, pageSize, substructures, metadata)
      }
      substructureLoading={substructureLoading}
      substructureTotal={Object.values(substructures).length}
    />
  );
}

SmilesSearchResult.propTypes = {
  history: PropTypes.object,
};

export default withRouter(memo(SmilesSearchResult));
