import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TargetSearchResultLayout from '../../components/SearchResultLayouts/TargetSearchResultLayout';
import { useInjectReducer } from '../../utils/injectReducer';
import smallMoleculeReducer from '../../data/cactus/smallmolecule/reducers';
import { useInjectSaga } from '../../utils/injectSaga';
import smallMoleculeSaga from '../../data/cactus/smallmolecule/sagas';
import {
  makeSelectTargetSmallMoleculeLoading,
  makeSelectTargetSmallMolecule,
  makeSelectMetadataLoading,
  makeSelectMetadata,
} from '../../data/cactus/smallmolecule/selectors';
import {
  fetchSmallmoleculeMeta,
  fetchTargetSmallMolecule,
} from '../../data/cactus/smallmolecule/actions';

function TargetSearchResult(props) {
  useInjectReducer({ key: 'smallmolecule', reducer: smallMoleculeReducer });
  useInjectSaga({ key: 'smallmolecule', saga: smallMoleculeSaga });
  const { targetStr } = useParams();
  const [smallMoleculeIds, setSmallMoleculeIds] = useState([]);
  const paginationPageSize = 5;
  const dispatch = useDispatch();

  /* Selectors Data for Render */

  const selectTargetSmallMoleculeLoading = makeSelectTargetSmallMoleculeLoading();
  const targetSmallMoleculeLoading = useSelector(
    selectTargetSmallMoleculeLoading,
  );
  const selectTargetSmallMolecule = makeSelectTargetSmallMolecule();
  const targetSmallMolecule = useSelector(selectTargetSmallMolecule);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);
  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  /* Fetch Target Molecules based on Query */

  useEffect(() => {
    dispatch(
      fetchTargetSmallMolecule({
        bearerToken: localStorage.token,
        targetNames: targetStr,
      }),
    );
  }, [targetStr]);

  /* Unnest Fetched Objects */
  function unnest(targetSm) {
    const smallMolecules = [];
    targetSm.map(target =>
      target.activity.map(mol =>
        smallMolecules.push(mol.smallmolecule.smallmolecule_id),
      ),
    );
    return [...new Set(smallMolecules)];
  }

  useEffect(() => {
    setSmallMoleculeIds(unnest(targetSmallMolecule));
  }, [targetSmallMolecule]);

  /* Functions for Pagination */

  function fetchMeta(page, pageSize, hits, meta) {
    const hitIds = hits.slice((page - 1) * pageSize, page * pageSize);
    const difference = hitIds.filter(
      x => !Object.keys(meta).includes(x.toString()),
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

  /* Fetch Metadata */
  useEffect(
    () => fetchMeta(1, paginationPageSize, smallMoleculeIds, metadata),
    [smallMoleculeIds],
  );

  const mols = smallMoleculeIds.map(x => ({ smallmolecule_id: x }));

  return (
    <TargetSearchResultLayout
      targetStr={targetStr}
      pageSize={5}
      metadataLoading={metadataLoading}
      metadata={metadata}
      // Target Molecules
      targetSmallMoleculeLoading={targetSmallMoleculeLoading}
      targetSmallMoleculePagination={(page, pageSize) =>
        fetchMeta(page, pageSize, smallMoleculeIds, metadata)
      }
      targetSmallMoleculeIds={mols}
      targetSmallMoleculeTotal={smallMoleculeIds.length}
    />
  );
}

TargetSearchResult.propTypes = {};

export default withRouter(memo(TargetSearchResult));
