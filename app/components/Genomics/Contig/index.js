import React, { memo } from 'react';
import { Divider, Space, Card } from 'antd';
import PropTypes from 'prop-types';
import PrismCluster from '../../../containers/PrismCluster';

function Contig(props) {
  const BGCs = props.clusters.map(cluster => (
    <PrismCluster
      key={cluster.cluster_id}
      clusterId={parseInt(cluster.cluster_id, 10)}
      chemoType={cluster.predicted_families}
      clusterStart={parseInt(cluster.cluster_start, 10)}
      clusterStop={parseInt(cluster.cluster_stop, 10)}
      showDescription
    />
  ));
  return (
    <div id={`contig-${props.contigId}`}>
      <Divider orientation="left"> CID: {props.contigId}</Divider>
      <Space direction="vertical" size={10}>
        <Card bordered={false}>{BGCs}</Card>
      </Space>
    </div>
  );
}

Contig.propTypes = {
  contigId: PropTypes.number,
  clusters: PropTypes.array,
};

export default memo(Contig);
