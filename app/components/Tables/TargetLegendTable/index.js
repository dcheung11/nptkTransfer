import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Table, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import bacteriaLegend from '../../ImageWrappers/TargetFigure/metadata/bacteria/legend.json';
import fungiLegend from '../../ImageWrappers/TargetFigure/metadata/fungi/legend.json';
import insectLegend from '../../ImageWrappers/TargetFigure/metadata/insect/legend.json';
import plantLegend from '../../ImageWrappers/TargetFigure/metadata/plant/legend.json';
const { Link } = Typography;

function TargetLegendTable({ target, ...props }) {
  const targetLookup = {
    plant: {
      legend: plantLegend,
    },
    insect: {
      legend: insectLegend,
    },
    fungi: {
      legend: fungiLegend,
    },
    bacteria: {
      legend: bacteriaLegend,
    },
  };

  const columns = [
    {
      title: 'Target #',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Activity Graph Search',
      dataIndex: 'activity',
      key: 'activity',
      render: x =>
        x ? (
          <SearchOutlined
            onClick={() =>
              props.history.push(`/apps/passport/search/activity/${x[0]}`)
            }
          />
        ) : (
          '-'
        ),
    },
    {
      title: 'Target Graph Search',
      dataIndex: 'target',
      key: 'target',
      render: x =>
        x ? (
          <SearchOutlined
            onClick={() =>
              props.history.push(
                `/apps/passport/search/target/${x
                  .map(y => `"${y}"`)
                  .join(',')}`,
              )
            }
          />
        ) : (
          '-'
        ),
    },
    {
      title: 'Link Out',
      dataIndex: 'proxyFigure',
      key: 'proxyFigure',
      render: x =>
        x ? <Link href={`/apps/target/${x.toLowerCase()}`}>{x}</Link> : '-',
    },
  ];

  return (
    <Table
      rowClassName={(record, index) => `${target}-record-${record.number}`}
      columns={columns}
      dataSource={targetLookup[target].legend
        .map(x => {
          x.key = `${target}-${x.number}`;
          return x;
        })
        .sort((a, b) => a.number - b.number)}
      pagination={false}
      {...props}
    />
  );
}

TargetLegendTable.propTypes = {
  target: PropTypes.string,
};

export default withRouter(memo(TargetLegendTable));
