import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MoleculeNameSearchResultLayout from '../../components/SearchResultLayouts/MoleculeNameSearchResultLayout';
import { useInjectReducer } from '../../utils/injectReducer';
import smallMoleculeReducer from '../../data/cactus/smallmolecule/reducers';
import { useInjectSaga } from '../../utils/injectSaga';
import smallMoleculeSaga from '../../data/cactus/smallmolecule/sagas';
import {
  makeSelectNameSmallmoleculeLoading,
  makeSelectNameSmallmolecule,
  makeSelectMetadataLoading,
  makeSelectMetadata,
} from '../../data/cactus/smallmolecule/selectors';
import {
  fetchSmallmoleculeMeta,
  fetchSmallmoleculeByName,
} from '../../data/cactus/smallmolecule/actions';

function MoleculeNameSearchResult(props) {
  useInjectReducer({ key: 'smallmolecule', reducer: smallMoleculeReducer });
  useInjectSaga({ key: 'smallmolecule', saga: smallMoleculeSaga });
  const { queryStr } = useParams();
  const paginationPageSize = 5;
  const dispatch = useDispatch();

  /* Selectors Data for Render */

  const selectNameSmallmoleculeLoading = makeSelectNameSmallmoleculeLoading();
  const nameSmallmoleculeLoading = useSelector(selectNameSmallmoleculeLoading);
  const selectNameSmallmolecule = makeSelectNameSmallmolecule();
  const nameSmallmolecule = useSelector(selectNameSmallmolecule);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);
  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  /* Fetch Target Molecules based on Query */

  useEffect(() => {
    dispatch(
      fetchSmallmoleculeByName({
        bearerToken: localStorage.token,
        queryStr,
      }),
    );
  }, [queryStr]);

  /* Functions for Pagination */

  function fetchMeta(page, pageSize, hits, meta) {
    const hitIds = Object.values(hits)
      .slice((page - 1) * pageSize, page * pageSize)
      .map(x => x.smallmolecule_id);
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
    () => fetchMeta(1, paginationPageSize, nameSmallmolecule, metadata),
    [nameSmallmolecule],
  );

  return (
    <MoleculeNameSearchResultLayout
      queryStr={queryStr}
      pageSize={5}
      metadataLoading={metadataLoading}
      metadata={metadata}
      // Name Molecules
      nameSmallmoleculeLoading={nameSmallmoleculeLoading}
      nameSmallmoleculePagination={(page, pageSize) =>
        fetchMeta(page, pageSize, nameSmallmolecule, metadata)
      }
      nameSmallMoleculeTotal={Object.values(nameSmallmolecule).length}
      nameSmallMolecule={Object.values(nameSmallmolecule)}
    />
  );
}

MoleculeNameSearchResult.propTypes = {};

export default withRouter(memo(MoleculeNameSearchResult));
