import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import Contig from '../Contig';

function PrismResult(props) {
  const contigs = {};
  props.submissionClusters.map(cluster => {
    // eslint-disable-next-line radix
    const contigId = parseInt(cluster.nuc_id);
    if (!contigs[contigId]) {
      contigs[contigId] = [];
    }
    contigs[contigId].push(cluster);
    return undefined;
  });
  const contigObjects = Object.keys(contigs).map(contigId => (
    <Contig
      key={`contig-${contigId}`}
      contigId={parseInt(contigId)}
      clusters={contigs[contigId]}
    />
  ));
  return contigObjects.length ? (
    <div>{contigObjects}</div>
  ) : (
    <Result
      status="warning"
      title="No Results Available."
      extra={
        <Button
          type="primary"
          key="console"
          onClick={() => props.history.push('/apps/puffin/')}
        >
          Go Back.
        </Button>
      }
    />
  );
}

PrismResult.propTypes = {
  history: PropTypes.object,
  submissionClusters: PropTypes.array,
};

export default withRouter(memo(PrismResult));
