import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Badge, Space } from 'antd';
import { stringToColour } from '../../../utils/texthelper';
import ChemotypeTag from '../../Tags/TagChemotype';

function PrismTable(props) {
  const columns = [
    {
      title: 'Submission ID',
      dataIndex: 'submission_id',
      key: 'submissionId',
      render: record => (
        <Link to={`/apps/prism/results/${record}`}>{record}</Link>
      ),
    },
    {
      title: 'PRISM Detected Clusters',
      dataIndex: 'num_clusters',
      key: 'numClusters',
    },
    {
      title: 'Chemotypes',
      dataIndex: 'chemotypes',
      key: 'chemotypes',
      render: record =>
        record && (
          <Space size={[8, 16]} wrap>
            {record.map((chemo, idx) => (
              <Badge
                key={`badge-${idx}-${chemo.families.join(',')}`}
                style={{
                  backgroundColor: stringToColour(chemo.families.join(',')),
                }}
                count={chemo.count}
              >
                {chemo &&
                  chemo.families.map((fam, famIdx) => (
                    <ChemotypeTag key={`tag-${fam}-${famIdx}`} family={fam} />
                  ))}
              </Badge>
            ))}
          </Space>
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      rowKey="submission_id"
      dataSource={props.genomeStats}
      pagination={false}
    />
  );
}

PrismTable.propTypes = {
  genomeStats: PropTypes.array,
};

export default withRouter(memo(PrismTable));
