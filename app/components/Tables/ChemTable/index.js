import React, { memo } from 'react';
import { Table } from 'antd';
import Molecule from '../../Chemistry/Molecule';

function ChemTable(props) {
  const chemColumns = [
    {
      title: 'ID',
      dataIndex: 'smallmolecule_id',
      key: 'smallmolecule_id',
    },
    {
      title: 'Molecular Class',
      dataIndex: 'chemotype',
      key: 'chemotype',
    },
    {
      title: 'Name',
      dataIndex: 'names',
      key: 'names',
    },
    {
      title: 'SMILES',
      dataIndex: 'original_smiles',
      key: 'original_smiles',
      render: record => <Molecule smiles={record} />,
    },
    {
      title: 'Known Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
  ];
  return <Table dataSource={props.data} columns={chemColumns} />;
}

export default memo(ChemTable);
