import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';

function AnalogNovelModal(props) {
  const columns = [
    {
      title: 'Novel Analog ID',
      dataIndex: 'novel_analog_id',
      key: 'novel_analog_id',
    },
    {
      title: 'm/z',
      dataIndex: 'mz',
      key: 'mz',
    },
    {
      title: 'Retention Time',
      dataIndex: 'rt',
      key: 'rt',
    },
    {
      title: 'Monoisotopic Mass',
      dataIndex: 'monoisotopic_mass',
      key: 'monoisotopic_mass',
    },
    {
      title: 'Intensity',
      dataIndex: 'intensity_raw',
      key: 'intensity_raw',
    },
    {
      title: 'Extract ID',
      dataIndex: 'extract_id',
      key: 'extract_id',
      render: eid => <Link to={`/apps/extract/results/${eid}`}>{eid}</Link>,
    },
  ];
  return (
    <Modal
      title={`Analog Group ID: ${props.analogId}`}
      visible={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      centered
      width="60%"
    >
      <Table
        style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        columns={columns}
        dataSource={props.analogNovel}
      />
    </Modal>
  );
}

AnalogNovelModal.propTypes = {
  analogNovel: PropTypes.array,
};

export default memo(AnalogNovelModal);
