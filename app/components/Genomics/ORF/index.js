import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Popover, Col, Space } from 'antd';
import Domain from '../Domain';
const { Title, Text } = Typography;

function Orf(props) {
  const domains = props.domains.map((domain, index) => (
    <Domain
      key={index}
      domainName={domain.gene}
      domainStart={domain.prism_start}
      domainStop={domain.prism_stop}
      domainDescription={domain.description}
      enumType={domain.enum}
      prismName={domain.prism_name}
    />
  ));
  const tooltip = (
    <div>
      <Title level={5}>Peptide ID: {props.peptideId}</Title>
      <Title level={5}>ORF ID: {props.orfId}</Title>
      <Text>
        ORF Start: {props.orfStart}
        <br />
        ORF Stop: {props.orfStop}
      </Text>
    </div>
  );
  return (
    <Space direction="vertical">
      <Col>{domains}</Col>
      <Popover content={tooltip}>
        <Text level={5} style={{ fontWeight: 'lighter', color: 'grey' }}>
          ORF {props.idx + 1}
        </Text>
      </Popover>
    </Space>
  );
}

Orf.propTypes = {
  orfId: PropTypes.number,
  orfStart: PropTypes.number,
  orfStop: PropTypes.number,
  peptideId: PropTypes.number,
  domains: PropTypes.array,
  idx: PropTypes.number,
};

export default memo(Orf);
