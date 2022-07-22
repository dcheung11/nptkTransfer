import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useInjectSaga } from '../../utils/injectSaga';
import submissionSaga from '../../data/cactus/submission/sagas';
import clusterSaga from '../../data/cactus/cluster/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import submissionReducer from '../../data/cactus/submission/reducers';
import clusterReducer from '../../data/cactus/cluster/reducers';
import {
  makeSelectMetadata,
  makeSelectMetadataLoading,
  makeSelectOrfs,
  makeSelectSubmissionId,
  makeSelectClusters,
  makeSelectOrfsLoading,
  makeSelectClustersLoading,
} from '../../data/cactus/submission/selectors';
import {
  fetchMetadata,
  fetchClusters,
  fetchOrfs,
} from '../../data/cactus/submission/actions';
import PrismPassport from '../../components/Passports/PrismPassport';

function PrismPassportPage(props) {
  const { resultId } = useParams();
  useInjectSaga({ key: 'submission', saga: submissionSaga });
  useInjectSaga({ key: 'cluster', saga: clusterSaga });
  useInjectReducer({ key: 'submission', reducer: submissionReducer });
  useInjectReducer({ key: 'cluster', reducer: clusterReducer });
  const dispatch = useDispatch();

  /* Fetch Metadata Data */

  useEffect(() => {
    dispatch(
      fetchMetadata({
        bearerToken: localStorage.token,
        submissionId: resultId,
      }),
    );
    return undefined;
  }, []);

  /* Fetch ORFs */

  useEffect(() => {
    dispatch(
      fetchOrfs({
        bearerToken: localStorage.token,
        submissionId: resultId,
      }),
    );
    return undefined;
  }, []);

  /* Fetch Clusters */

  useEffect(() => {
    dispatch(
      fetchClusters({
        bearerToken: localStorage.token,
        submissionId: resultId,
      }),
    );
    return undefined;
  }, []);

  /* Selectors Data for Render */

  const selectSubmissionId = makeSelectSubmissionId();
  const submissionId = useSelector(selectSubmissionId);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoadingStatus = useSelector(selectMetadataLoading);

  const selectOrfsLoading = makeSelectOrfsLoading();
  const orfsLoadingStatus = useSelector(selectOrfsLoading);

  const selectClustersLoading = makeSelectClustersLoading();
  const clustersLoadingStatus = useSelector(selectClustersLoading);

  const selectOrfs = makeSelectOrfs();
  const genomeOrfs = useSelector(selectOrfs);

  const selectMetadata = makeSelectMetadata();
  const genomeMetadata = useSelector(selectMetadata);

  const selectClusters = makeSelectClusters();
  const submissionClusters = useSelector(selectClusters);

  return (
    <PrismPassport
      submissionId={submissionId}
      metadataLoadingStatus={metadataLoadingStatus}
      orfsLoadingStatus={orfsLoadingStatus}
      clustersLoadingStatus={clustersLoadingStatus}
      genomeOrfs={Object.values(genomeOrfs.results)[0]}
      genomeMetadata={Object.values(genomeMetadata)[0]}
      submissionClusters={Object.values(submissionClusters.results)[0]}
      resultId={resultId}
    />
  );
}

export default memo(PrismPassportPage);
