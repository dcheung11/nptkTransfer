import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import ActivitySearchResultLayout from '../../components/SearchResultLayouts/ActivitySearchResultLayout';
import { useInjectReducer } from '../../utils/injectReducer';
import smallMoleculeReducer from '../../data/cactus/smallmolecule/reducers';
import { useInjectSaga } from '../../utils/injectSaga';
import smallMoleculeSaga from '../../data/cactus/smallmolecule/sagas';
import {
  makeSelectCategorySmallmoleculeLoading,
  makeSelectCategorySmallmolecule,
  makeSelectMetadataLoading,
  makeSelectMetadata,
} from '../../data/cactus/smallmolecule/selectors';
import {
  fetchSmallmoleculeByCategory,
  fetchSmallmoleculeMeta,
} from '../../data/cactus/smallmolecule/actions';

function ActivitySearchResult(props) {
  useInjectReducer({ key: 'smallmolecule', reducer: smallMoleculeReducer });
  useInjectSaga({ key: 'smallmolecule', saga: smallMoleculeSaga });
  const { activityStr } = useParams();
  const paginationPageSize = 5;
  const dispatch = useDispatch();

  /* Selecting Data for Render */

  const selectCategorySmallmoleculeLoading = makeSelectCategorySmallmoleculeLoading();
  const categorySmallmoleculeLoading = useSelector(
    selectCategorySmallmoleculeLoading,
  );
  const selectCategorySmallmolecule = makeSelectCategorySmallmolecule();
  const categoryHits = useSelector(selectCategorySmallmolecule);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);
  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  /* Fetch Target Molecules based on Query */

  useEffect(() => {
    dispatch(
      fetchSmallmoleculeByCategory({
        bearerToken: localStorage.token,
        categoryStr: activityStr,
      }),
    );
  }, [activityStr]);

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

  /* Fetch Metadata for Matches */
  useEffect(() => fetchMeta(1, paginationPageSize, categoryHits, metadata), [
    categoryHits,
  ]);

  return (
    <ActivitySearchResultLayout
      activityStr={activityStr}
      pageSize={5}
      metadataLoading={false}
      metadata={metadata}
      // Category Hits
      categorySmallmoleculeLoading={false}
      categoryPagination={(page, pageSize) =>
        fetchMeta(page, pageSize, categoryHits, metadata)
      }
      categoryMols={categoryHits}
      categoryTotal={categoryHits.length}
    />
  );
}

ActivitySearchResultLayout.propTypes = {};

export default withRouter(memo(ActivitySearchResult));
