import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Select, Space, Checkbox, InputNumber } from 'antd';
import BarChart from '../../../BI/BarChart';
const { Option } = Select;

function LeaderboardSmallMoleculePane(props) {
  const activityOptions = [
    {
      activity: 'antiparasitic',
    },
    {
      activity: 'toxin class iii',
    },
    {
      activity: 'anticancer',
    },
    {
      activity: 'toxin class iv',
    },
    {
      activity: 'antiviral',
    },
    {
      activity: 'plant_promoter',
    },
    {
      activity: 'antitubercular',
    },
    {
      activity: 'antifungal',
    },
    {
      activity: 'toxin class i',
    },
    {
      activity: 'toxin class ii',
    },
    {
      activity: 'immunosupressant',
    },
  ]
    .map(x => x.activity)
    .sort()
    .map(x => (
      <Option key={x} value={x}>
        {x}
      </Option>
    ));

  activityOptions.push(
    <Option key="all" value="*">
      All
    </Option>,
  );

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
      <Space>
        <Space>
          <span>Activity:</span>
          <Select
            defaultValue={props.activity}
            onSelect={x => props.setActivity(x)}
          >
            {activityOptions}
          </Select>
        </Space>
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
        <Checkbox
          onChange={x => props.setOnlyBacteria(x.target.checked)}
          checked={props.onlyBacteria}
        >
          Only Bacterial?
        </Checkbox>
        <Space>
          <span> Max Items:</span>
          <InputNumber
            onChange={props.setMaxItems}
            defaultValue={props.maxItems}
          />
        </Space>
      </Space>
      <BarChart
        categories={props.taxNames}
        allSeriesData={props.activityCountData}
        style={{ height: '100vh' }}
      />
    </div>
  );
}

LeaderboardSmallMoleculePane.propTypes = {
  taxNames: PropTypes.array,
  activity: PropTypes.string,
  setActivity: PropTypes.func,
  rankFilter: PropTypes.string,
  setRankFilter: PropTypes.func,
  setOnlyBacteria: PropTypes.func,
  onlyBacteria: PropTypes.bool,
  setMaxItems: PropTypes.func,
  maxItems: PropTypes.number,
  activityCountData: PropTypes.any,
};

export default memo(LeaderboardSmallMoleculePane);
