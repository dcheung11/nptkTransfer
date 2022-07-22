import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Table } from 'antd';

function ContigTable(props) {
  const columns = [
    {
      title: 'CID',
      dataIndex: 'nuc_id',
      key: 'nucleotideId',
    },
    {
      title: 'Contig Name',
      dataIndex: 'contig_name',
      key: 'contigName',
    },
    {
      title: 'Total # of Genes',
      dataIndex: 'gene_count',
      key: 'geneCount',
    },
    {
      title: 'GC-Content',
      dataIndex: 'gc_content',
      key: 'gcContent',
      render: record => (record ? record.toFixed(2) : 0),
    },
    {
      title: 'Length',
      dataIndex: 'contig_length',
      key: 'contigLength',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.genomeMetadata.contigs}
      pagination={false}
    />
  );
}

ContigTable.propTypes = {
  genomeMetadata: PropTypes.object,
};

export default withRouter(memo(ContigTable));
