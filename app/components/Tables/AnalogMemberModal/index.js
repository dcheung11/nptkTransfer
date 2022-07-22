import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Table } from 'antd';
import MoleculeWithModal from '../../Chemistry/MoleculeWithModal';

function AnalogMemberModal(props) {
  const columns = [
    {
      title: 'Small Molecule ID',
      dataIndex: 'smallmolecule_id',
      key: 'smallmolecule_id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'SMILES',
      dataIndex: 'smallmolecule',
      key: 'original_smiles',
      render: record => (
        <MoleculeWithModal
          smilesValue={record.original_smiles}
          uuid={record.smallmolecule_id}
          drawingHeight={50}
          drawingWidth={100}
        />
      ),
    },
    {
      title: 'Extract IDs',
      dataIndex: 'smallmolecule',
      key: 'extractIds',
      render: record =>
        !!props.extractLookup[record.smallmolecule_id] &&
        props.extractLookup[
          record.smallmolecule_id
        ].maple_peaks_table.self_peaks_table.map(x => (
          <Link to={`/apps/extract/results/${x.extract_id}`}>
            {`${x.extract_id} `}
          </Link>
        )),
    },
  ];
  return (
    <Modal
      title={`Analog Group ID: ${props.analogId}`}
      visible={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      centered
      width="80%"
    >
      <Table
        style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        columns={columns}
        dataSource={props.analogMembers}
      />
    </Modal>
  );
}

AnalogMemberModal.propTypes = {
  analogMembers: PropTypes.array,
  extractLookup: PropTypes.object,
  genomicLookup: PropTypes.object,
};

export default memo(AnalogMemberModal);
