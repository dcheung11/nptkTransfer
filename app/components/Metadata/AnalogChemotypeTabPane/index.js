import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import AnalogGroup from '../../Miscellaneous/AnalogGroup';

function AnalogChemotypeTabPane(props) {
  const AnalogFamilies = props.hits.map((x, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <AnalogGroup key={idx} analogGroup={x} analogIndex={idx} />
  ));
  return (
    <div id={`${props.chemotype}-pane`}>
      <Row>{AnalogFamilies}</Row>
    </div>
  );
}

AnalogChemotypeTabPane.propTypes = {
  chemotype: PropTypes.string,
  hits: PropTypes.array,
};

export default withRouter(memo(AnalogChemotypeTabPane));
