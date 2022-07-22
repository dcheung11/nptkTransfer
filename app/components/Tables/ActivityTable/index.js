import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import TagTaxonomy from '../../Tags/TagTaxonomy';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
const { Link } = Typography;

function ActivityTable(props) {
  const columns = [
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: 'Effect',
      key: 'effect',
      dataIndex: 'effect',
      render: x => (x ? capitalizeFirstLetter(x) : '-'),
    },
    {
      title: 'Gram Stain Specificity',
      key: 'gram_stain_tmp',
      dataIndex: 'gram_stain_tmp',
      render: x => (x ? capitalizeFirstLetter(x) : '-'),
    },
    {
      title: 'Relevance',
      key: 'relevance',
      dataIndex: 'relevance',
      render: x => (x ? capitalizeFirstLetter(x) : '-'),
    },
    {
      title: 'Organism Specificity',
      key: 'target_organism_name_tmp',
      dataIndex: 'target_organism_name_tmp',
      render: x => (x ? capitalizeFirstLetter(x) : '-'),
    },
    {
      title: 'Target Name',
      key: 'target_name',
      dataIndex: 'target',
      render: x => (x && x.name ? capitalizeFirstLetter(x.name) : '-'),
    },
    {
      title: 'Target Type',
      key: 'target_type',
      dataIndex: 'target',
      render: x => (x && x.type ? capitalizeFirstLetter(x.type) : '-'),
    },
    {
      title: 'Target Effect Type',
      key: 'target_effect',
      dataIndex: 'target',
      render: x => (x && x.effect ? capitalizeFirstLetter(x.effect) : '-'),
    },
  ];
  return <Table dataSource={props.activities} columns={columns} />;
}
ActivityTable.propTypes = {
  activities: PropTypes.array,
};

export default ActivityTable;
