import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Cluster from '../../components/Genomics/Cluster';
import { fetchPrismCluster } from '../../data/cactus/cluster/actions';
import {
  makeSelectClusterPrismLoading,
  makeSelectClusterPrismOrfs,
} from '../../data/cactus/cluster/selectors';
function PrismCluster(props) {
  const dispatch = useDispatch();

  /* Get Cluster Status */
  const selectClusterPrismLoading = makeSelectClusterPrismLoading(
    props.clusterId,
  );
  const clusterPrismLoading = useSelector(selectClusterPrismLoading);

  /* Get Cluster ORFs */
  const selectClusterPrismOrfs = makeSelectClusterPrismOrfs(props.clusterId);
  const clusterPrismOrfs = useSelector(selectClusterPrismOrfs);

  /* Fetch the PRISM report for the BGC */
  useEffect(() => {
    dispatch(
      fetchPrismCluster({
        bearerToken: localStorage.token,
        submissionId: props.clusterId,
      }),
    );
  }, [props.clusterId]);

  return (
    <Cluster
      {...props}
      orfLoadingStatus={clusterPrismLoading}
      orfs={clusterPrismOrfs === undefined ? [] : clusterPrismOrfs}
    />
  );
}

PrismCluster.propTypes = {
  clusterId: PropTypes.number,
};
export default memo(PrismCluster);
