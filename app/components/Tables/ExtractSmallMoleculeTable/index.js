import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import TagActivity from '../../Tags/TagActivity';
import { capitalizeFirstLetter } from '../../../utils/texthelper';

function ExtractSmallMoleculeTable(props) {
  const columns = [
    {
      title: 'Small Molecule ID',
      dataIndex: 'smallmolecule_id',
      key: 'smallmolecule_id',
      width: '5vw',
      render: record =>
        record ? (
          <Link
            to={location => ({
              ...location,
              pathname: `/apps/smallmolecule/results/${record}`,
            })}
          >
            {record}
          </Link>
        ) : null,
      filteredValue: props.activityProfiles,
      onFilter: (key, record) => filterData(key, record),
    },
    {
      title: 'Names',
      dataIndex: 'names',
      key: 'names',
      width: '15vw',
      render: record =>
        record ? record.map(capitalizeFirstLetter).join(', ') : null,
    },
    {
      title: 'Activity',
      dataIndex: 'activity_profile',
      key: 'activity',
      width: '20vw',
      render: record =>
        record ? record.map(x => <TagActivity activity={x} />) : null,
    },
    {
      title: 'Retention Time',
      dataIndex: 'maple_peak_id',
      key: 'rt',
      width: '5vw',
      render: record =>
        props.peakLookup[record] ? props.peakLookup[record].rt : null,
      sorter: (a, b) => sortRT(a, b),
    },
    {
      title: 'm/z',
      dataIndex: 'maple_peak_id',
      key: 'mz',
      width: '5vw',
      render: record =>
        props.peakLookup[record]
          ? Math.round(props.peakLookup[record].mz * 1000) / 1000
          : null,
      sorter: (a, b) => sortMZ(a, b),
    },
  ];

  const sortRT = (a, b) => {
    const aRT = props.peakLookup[a.maple_peak_id]
      ? props.peakLookup[a.maple_peak_id].rt
      : null;
    const bRT = props.peakLookup[b.maple_peak_id]
      ? props.peakLookup[b.maple_peak_id].rt
      : null;
    return aRT - bRT;
  };

  const sortMZ = (a, b) => {
    const aMZ = props.peakLookup[a.maple_peak_id]
      ? props.peakLookup[a.maple_peak_id].mz
      : null;
    const bMZ = props.peakLookup[b.maple_peak_id]
      ? props.peakLookup[b.maple_peak_id].mz
      : null;
    return aMZ - bMZ;
  };

  // eslint-disable-next-line consistent-return
  const filterData = (key, record) => {
    const entryActivities = record.activity_profile;
    const reference = props.activityProfiles;

    return reference.every(elem => entryActivities.includes(elem));
  };
  return (
    <Table
      rowClassName={record => `maple-peak-id-${record.maple_peak_id}`}
      key={props.key}
      rowKey={() => uuidv4()}
      dataSource={props.smallMolecules}
      columns={columns}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  );
}

ExtractSmallMoleculeTable.propTypes = {
  activityProfiles: PropTypes.array,
  smallMolecules: PropTypes.array,
  peakLookup: PropTypes.object,
  key: PropTypes.any,
};

export default withRouter(memo(ExtractSmallMoleculeTable));
