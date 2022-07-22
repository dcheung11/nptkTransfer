import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

function TaxBreadcrumb(props) {
  const breadcrumbs = [];
  if (props.taxonomyData) {
    const hierarchy = 'kingdom.phylum.class.order.family.genus.species.strain'.split(
      '.',
    );
    const orderedNodes = hierarchy
      .map(k => props.taxonomyData[k])
      .filter(Boolean);
    const orderedKeys = hierarchy
      .map(k => props.taxonomyData[`${k}_id`])
      .filter(Boolean);
    const path = orderedNodes.join('.');
    breadcrumbs.push(
      path.split('.').map((node, idx) => (
        <Breadcrumb.Item
          key={orderedKeys[idx]}
          onClick={() =>
            props.history.push(`/apps/taxonomy/results/${orderedKeys[idx]}`)
          }
        >
          {node}
        </Breadcrumb.Item>
      )),
    );
  }
  if (props.submissionId) {
    breadcrumbs.push(
      <Breadcrumb.Item
        key={`genome-${props.submissionId}`}
        onClick={() =>
          props.history.push(`/apps/prism/results/${props.submissionId}`)
        }
      >
        {`SID: ${props.submissionId}`}
      </Breadcrumb.Item>,
    );
  }
  if (props.contigId) {
    breadcrumbs.push(
      <Breadcrumb.Item
        key={`contig-${props.contigId}`}
        onClick={() =>
          props.history.push(
            `/apps/prism/results/${props.submissionId}/#contig-${
              props.contigId
            }`,
          )
        }
      >
        {`CID: ${props.contigId}`}
      </Breadcrumb.Item>,
    );
  }
  if (props.clusterId) {
    breadcrumbs.push(
      <Breadcrumb.Item key={`cluster-${props.clusterId}`}>
        {`BGC: ${props.clusterId}`}
      </Breadcrumb.Item>,
    );
  }

  return <Breadcrumb separator={'>'}>{breadcrumbs}</Breadcrumb>;
}

TaxBreadcrumb.propTypes = {
  history: PropTypes.object,
  taxonomyData: PropTypes.object,
  submissionId: PropTypes.number,
  contigId: PropTypes.number,
  clusterId: PropTypes.number,
};

export default withRouter(memo(TaxBreadcrumb));
