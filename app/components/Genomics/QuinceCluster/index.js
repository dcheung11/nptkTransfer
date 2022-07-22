import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Space } from 'antd';
import PrismCluster from '../../../containers/PrismCluster';
import TaxBreadcrumb from '../../TreeLike/TaxBreadcrumb';

function QuinceCluster(props) {
  return (
    <Card bordered={false}>
      <Space direction="vertical" size={40}>
        <Row>
          <TaxBreadcrumb
            taxonomyData={props.metadata.tax}
            submissionId={props.metadata.submission_id}
            contigId={props.metadata.nuc_id}
            clusterId={props.metadata.cluster_id}
          />
        </Row>
        {props.children && <Row>{props.children}</Row>}
        <Row>
          <PrismCluster
            clusterId={parseInt(props.metadata.cluster_id, 10)}
            chemoType={props.metadata.predicted_families}
            clusterStart={props.metadata.cluster_start}
            clusterStop={props.metadata.cluster_stop}
            additionalDescriptions={props.additionalDescriptions}
            showDescription
          />
        </Row>
      </Space>
    </Card>
  );
}

QuinceCluster.propTypes = {
  children: PropTypes.node,
  metadata: PropTypes.object,
  additionalDescriptions: PropTypes.node,
};

export default memo(QuinceCluster);
