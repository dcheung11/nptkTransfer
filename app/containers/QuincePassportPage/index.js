import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import QuincePassport from '../../components/Passports/QuincePassport';
import clusterSaga from '../../data/cactus/cluster/sagas';
import clusterReducer from '../../data/cactus/cluster/reducers';
import {
  fetchPrismCluster,
  fetchQuinceKnown,
  fetchMinhashRelatives,
  fetchClusterMetadata,
} from '../../data/cactus/cluster/actions';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import {
  makeSelectClusterPrismLoading,
  makeSelectMinHashLoading,
  makeSelectQuinceKnownLoading,
  makeSelectRelatives,
  makeSelectKnownData,
  makeSelectMetadataLoading,
  makeSelectMetadata,
} from '../../data/cactus/cluster/selectors';

function QuincePassportPage(props) {
  useInjectSaga({ key: 'cluster', saga: clusterSaga });
  useInjectReducer({ key: 'cluster', reducer: clusterReducer });

  const { clusterId } = useParams();

  /*
  Setup Actions to Dispatch
   */
  const dispatch = useDispatch();

  /* Fetch Metadata for Query Cluster */
  useEffect(() => {
    dispatch(
      fetchClusterMetadata({
        submissionId: clusterId,
        bearerToken: localStorage.token,
      }),
    );
  }, []);

  /* Fetch PRISM View for Query Cluster */
  useEffect(() => {
    dispatch(
      fetchPrismCluster({
        submissionId: clusterId,
        bearerToken: localStorage.token,
      }),
    );
  }, []);

  /* Fetch Quince Distances for Known Clusters */

  function knownSearch(page, pageSize) {
    dispatch(
      fetchQuinceKnown({
        submissionId: clusterId,
        bearerToken: localStorage.token,
        similarityCutoff: 0.7,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
    );
    return undefined;
  }

  useEffect(() => knownSearch(1, 10), []);

  /* Fetch Initial Global Clusters */
  function globalSearch(page, pageSize) {
    dispatch(
      fetchMinhashRelatives({
        submissionId: clusterId,
        bearerToken: localStorage.token,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }),
    );
    return undefined;
  }

  useEffect(() => globalSearch(1, 5), []);

  /* Selectors */

  const selectClusterPrismLoading = makeSelectClusterPrismLoading(clusterId);
  const clusterPrismLoadingStatus = useSelector(selectClusterPrismLoading);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);

  const selectMinHashLoading = makeSelectMinHashLoading();
  const minHashLoadingStatus = useSelector(selectMinHashLoading);

  const selectQuinceKnownLoading = makeSelectQuinceKnownLoading();
  const quinceKnownLoadingStatus = useSelector(selectQuinceKnownLoading);

  const selectRelatives = makeSelectRelatives();
  const relatives = useSelector(selectRelatives);

  const selectKnownData = makeSelectKnownData();
  const knownData = useSelector(selectKnownData);

  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  return (
    <QuincePassport
      clusterPrismLoadingStatus={clusterPrismLoadingStatus}
      metadataLoading={metadataLoading}
      minhashLoading={minHashLoadingStatus}
      quinceKnownLoading={quinceKnownLoadingStatus}
      clusterId={clusterId}
      knownData={knownData}
      metadata={
        (metadata[clusterId] && Object.values(metadata[clusterId])[0]) ||
        undefined
      }
      relatives={
        (!!relatives[clusterId] && relatives[clusterId].hits) || undefined
      }
      total={
        (!!relatives[clusterId] && relatives[clusterId].total) || undefined
      }
      globalSearch={globalSearch}
      knownSearch={knownSearch}
    />
  );
}

export default memo(QuincePassportPage);
