import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, Popover } from 'antd';

const { Title, Text } = Typography;

function Domain(props) {
  const enumColorDict = {
    ArylPolyene: '#1450b4',
    Aminocoumarin: '#b4a7d6',
    Aminoglycoside: '#E79960',
    Antimetabolite: '#b7b7b7',
    BetaLactam: '#42B269',
    Bisindole: '#b45f06',
    Cyclodipepetide: '#e06666',
    DeoxySugar: '#c9daf8',
    Ectoine: '#6aa84f',
    Furan: '#45818e',
    HomoserineLactone: '#b4e4e7',
    Ladderane: '#b7b7b7',
    Melanin: '#D3D858',
    NIS: '#917d75',
    Nucleoside: '#a64d79',
    Phenazine: '#95EA35',
    Phosphoglycolipid: '#F55CBB',
    Phosphonate: '#f99dd6',
    Prerequisite: '#b7b7b7',
    PrimaryBiosynthesis: '#b7b7b7',
    Resorcinol: '#6de1fb',
    Ribosomal: '#ff0000',
    Stilbene: '#63ba00',
    Tailoring: '#434343',
    Terpene: '#5FDBAC',
    TypeIPolyketide: '#4c8fd3',
    TypeIIPolyketide: '#915CC0',
    Lincosamide: '#ee9907',
    Isonitrile: '#bceaea',
    // Thiotemplated: '#fff',
    Resistance: '#07424c',
    Regulator: '#ee8fe3',
  };

  const domainColor = {
    ADENYLATION: '#FF0000',
    ACYLTRANSFERASE: '#1D7CF2',
    CONDENSATION: '#FF4C4C',
    'CYCLASE_CLADE_*': '#CC3D3D',
    EPIMERASE: '#CC0000',
    KETOSYNTHASE: '#4439AC',
    ENOYLREDUCTASE: '#73859d',
    KETOREDUCTASE: '#42426F',
    DEHYDRATASE: '#0099CC',
    THIOLATION: '#bbb',
    THIOESTERASE: '#21252B',
  };

  const tooltip = (
    <div>
      <Title level={5}> Domain Name: {props.domainName}</Title>
      <Text>
        <b>Description: </b>
        {props.domainDescription}
        <br />
        <b>Domain Start: </b>
        {props.domainStart}
        <br />
        <b>Domain Stop: </b>
        {props.domainStop}
      </Text>
    </div>
  );
  return (
    <Popover content={tooltip}>
      <Avatar
        style={{
          backgroundColor:
            enumColorDict[props.enumType] || domainColor[props.prismName],
        }}
      >
        {props.domainName.length > 4
          ? props.domainName.slice(0, 1)
          : props.domainName}
      </Avatar>
    </Popover>
  );
}

Domain.propTypes = {
  prismName: PropTypes.string,
  domainName: PropTypes.string,
  domainStart: PropTypes.number,
  domainStop: PropTypes.number,
  domainDescription: PropTypes.string,
  enumType: PropTypes.string,
};

export default memo(Domain);
