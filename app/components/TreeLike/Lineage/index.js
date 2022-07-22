import React, { memo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Steps, Typography } from 'antd';
import PropTypes from 'prop-types';
import TagTaxonomy from '../../Tags/TagTaxonomy';
const { Step } = Steps;
const { Link } = Typography;

function Lineage(props) {
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
  return (
    <Steps
      style={{ marginTop: 30, marginBottom: 30 }}
      progressDot
      current={Object.keys(props.taxonomyData).length / 2}
    >
      {path.split('.').map((node, idx) => (
        <Step
          title={
            <Link
              style={{ fontSize: 14 }}
              onClick={() =>
                props.history.push(`/apps/taxonomy/results/${orderedKeys[idx]}`)
              }
            >
              {node}
            </Link>
          }
          key={orderedKeys[idx]}
          size="small"
          // description={<TagTaxonomy rank={hierarchy[idx]} />}
          description={hierarchy[idx]}
        />
      ))}
    </Steps>
  );
}

Lineage.propTypes = {
  taxonomyData: PropTypes.object,
};

export default withRouter(memo(Lineage));
