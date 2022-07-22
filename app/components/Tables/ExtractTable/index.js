import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function ExtractTable(props) {
  const columns = [
    {
      title: 'Extract ID',
      dataIndex: 'extract_id',
      key: 'extractionId',
      render: record =>
        record ? (
          <Link
            to={location => ({
              ...location,
              pathname: `/apps/extract/results/${record}`,
            })}
            key={uuidv4()}
          >
            {record}
          </Link>
        ) : null,
    },
    {
      title: 'Suggested MZML Name',
      key: 'mzml_fh',
      render: record =>
        record
          ? `${(!!record.user_details && record.user_details.initials) ||
              (!!record.user_details && record.user_details.first_name)}_${
            record.created_date.toString().split('T')[0]
          }_${record.extract_id}_${!!props.tax &&
              props.tax.genus}${!!props.tax &&
              !!props.tax.species &&
              `_${props.tax.species}${!!props.tax.strain &&
                `_${props.tax.strain.replace(' ', '-')}`}.mzml`}
          `
          : null,
    },
    {
      title: 'Researcher',
      dataIndex: 'user_details',
      key: 'userDetails',
      render: record => (record ? record.initials || record.first_name : null),
    },

    {
      title: 'Extraction Solvent Volume',
      dataIndex: 'extraction_solvent_volume',
      key: 'extractionSolventVolume',
    },
    {
      title: 'Extraction Solvent',
      dataIndex: 'extract_extraction_solvent',
      key: 'extractExtractionSolvent',
      render: record => (record ? record.name : null),
    },
    {
      title: 'Extraction Method',
      dataIndex: 'extract_extraction_method',
      key: 'extractExtractionMethod',
      render: record => (record ? record.name : null),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'createDate',
      render: record =>
        new Date(Date.parse(record)).toLocaleDateString('en-US'),
    },
    {
      title: 'Extraction Date',
      dataIndex: 'extraction_date',
      key: 'extractionDate',
      render: record =>
        new Date(Date.parse(record)).toLocaleDateString('en-US'),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    // {
    //   title: 'Resuspension Solvent Volume',
    //   dataIndex: 'resuspension_solvent_volume',
    //   key: 'resuspensionSolventVolume',
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
  ];
  return (
    <Table
      key={props.key}
      rowKey="extract_id"
      dataSource={props.extract}
      columns={columns}
      pagination={false}
    />
  );
}

ExtractTable.propTypes = {
  extract: PropTypes.array,
  key: PropTypes.any,
  tax: PropTypes.object,
};

export default memo(ExtractTable);
