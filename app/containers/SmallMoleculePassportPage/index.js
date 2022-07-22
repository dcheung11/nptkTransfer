import React, { memo, useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SmallMoleculePassport from '../../components/Passports/SmallMoleculePassport';
import { useInjectReducer } from '../../utils/injectReducer';
import smallMoleculeReducer from '../../data/cactus/smallmolecule/reducers';
import { useInjectSaga } from '../../utils/injectSaga';
import smallMoleculeSaga from '../../data/cactus/smallmolecule/sagas';
import {
  makeSelectMetadata,
  makeSelectMetadataLoading,
  makeSelectSimilarity,
  makeSelectSimilarityLoading,
  makeSelectSubstructureLoading,
  makeSelectSubstructures,
  makeSelectSmidMetadata,
  makeSelectVerboseLoading,
  makeSelectVerbose,
} from '../../data/cactus/smallmolecule/selectors';
import {
  fetchSimilarity,
  fetchSmallmoleculeMeta,
  fetchSmilesSubstructures,
  fetchSmallmoleculeVerbose,
} from '../../data/cactus/smallmolecule/actions';

function SmallMoleculePassportPage(props) {
  const { smId } = useParams();
  useInjectReducer({ key: 'smallmolecule', reducer: smallMoleculeReducer });
  useInjectSaga({ key: 'smallmolecule', saga: smallMoleculeSaga });
  const paginationPageSize = 5;
  const dispatch = useDispatch();

  /* Selectors Data for Render */
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

  const selectVerboseLoading = makeSelectVerboseLoading();
  const verboseLoading = useSelector(selectVerboseLoading);
  const selectVerbose = makeSelectVerbose();
  const verbose = useSelector(selectVerbose);

  const selectSmIdMetadata = makeSelectSmidMetadata(smId);
  const smidMetadata = useSelector(selectSmIdMetadata);

  const smilesStr = smidMetadata ? smidMetadata.original_smiles : '';

  /* Fetching Data */

  useEffect(() => {
    dispatch(
      fetchSmallmoleculeMeta({
        bearerToken: localStorage.token,
        smIds: [smId],
      }),
    );
  }, [smId]);

  useEffect(() => {
    dispatch(
      fetchSmilesSubstructures({
        bearerToken: localStorage.token,
        smiles: smilesStr,
        numLimit: 'null',
        numOffset: 'null',
      }),
    );
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
  }, [smilesStr]);

  useEffect(() => {
    dispatch(
      fetchSmallmoleculeVerbose({
        bearerToken: localStorage.token,
        smIds: [smId],
      }),
    );
  }, [smId]);

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

  useEffect(() => fetchMeta(1, paginationPageSize, similarity, metadata), [
    similarity,
  ]);
  useEffect(() => fetchMeta(1, paginationPageSize, substructures, metadata), [
    substructures,
  ]);

  return (
    <SmallMoleculePassport
      smId={smId}
      pageSize={paginationPageSize}
      metadata={metadata || {}}
      verbose={verbose || {}}
      substructures={Object.values(substructures)}
      substructureLoading={substructureLoading}
      substructureTotal={Object.values(substructures).length}
      substructurePagination={(page, pageSize) =>
        fetchMeta(page, pageSize, substructures, metadata)
      }
      similarityLoading={similarityLoading}
      similarityPagination={(page, pageSize) =>
        fetchMeta(page, pageSize, similarity, metadata)
      }
      similarity={Object.values(similarity)}
      similarityTotal={Object.values(similarity).length}
    />
  );
}

export default withRouter(memo(SmallMoleculePassportPage));
