import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Space, Slider, Row, Col, Select } from 'antd';
import BarChart from '../../../BI/BarChart';

const { Option } = Select;

function LeaderboardExtractPane(props) {
  const allSeriesData = {
    seriesColor: '#dbd213',
    seriesName: 'In-House Extract Hits',
    seriesData: props.extractCounts,
  };
  const ranks = [
    'kingdom',
    'phylum',
    'class',
    'order',
    'family',
    'genus',
    'species',
  ];
  return (
    <div>
      <Row align="center">
        <Space>
          <span>Rank:</span>
          <Select
            defaultValue={props.rankFilter}
            onSelect={x => props.setRankFilter(x)}
          >
            {ranks.map(x => (
              <Option key={x} value={x}>
                {x}
              </Option>
            ))}
          </Select>
        </Space>
        <Col span={1} />
        <Col span={2}>
          <Checkbox
            onChange={x => props.setUseMalarialFilter(x.target.checked)}
            defaultValue={props.useMalarialFilter}
          >
            Malarial DD2 Inhibition
          </Checkbox>
        </Col>
        <Col span={6}>
          <Slider
            range
            min={-100}
            max={105}
            defaultValue={[props.malarialDdpMin, props.malarialDdpMax]}
            onChange={x => {
              props.setMalarialDdpMin(x[0]);
              props.setMalarialDdpMax(x[1]);
            }}
          />
        </Col>
        <Col span={1} />
        <Col span={3}>
          <Checkbox
            onChange={x => props.setUseTbFilter(x.target.checked)}
            defaultValue={props.useTbFilter}
          >
            Tuberculosis RFU Inhibition?
          </Checkbox>
        </Col>
        <Col span={6}>
          <Slider
            range
            min={-100}
            max={100}
            defaultValue={[props.tbRFUMin, props.tbRFUMax]}
            onChange={x => {
              props.setTbRFUMin(x[0]);
              props.setTbRFUMax(x[1]);
            }}
          />
        </Col>
      </Row>
      <BarChart
        categories={props.taxNames}
        allSeriesData={[allSeriesData]}
        style={{ height: '100vh' }}
      />
    </div>
  );
}

LeaderboardExtractPane.propTypes = {
  extractCounts: PropTypes.array,
  taxNames: PropTypes.array,
  rankFilter: PropTypes.string,
  setRankFilter: PropTypes.func,
  useTbFilter: PropTypes.bool,
  setUseTbFilter: PropTypes.func,
  tbRFUMin: PropTypes.number,
  tbRFUMax: PropTypes.number,
  setTbRFUMin: PropTypes.func,
  setTbRFUMax: PropTypes.func,
  useMalarialFilter: PropTypes.bool,
  setUseMalarialFilter: PropTypes.func,
  malarialDdpMax: PropTypes.number,
  malarialDdpMin: PropTypes.number,
  setMalarialDdpMin: PropTypes.func,
  setMalarialDdpMax: PropTypes.func,
};

export default memo(LeaderboardExtractPane);
