import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Space, Row, Descriptions, Card, Spin } from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import Orf from '../ORF';

function Cluster(props) {
  const orfs =
    props.orfs.length > 0 ? (
      props.orfs.map((orf, idx) => (
        <Orf
          key={orf.orf_id}
          orfId={orf.orf_id}
          idx={idx}
          orfStart={orf.orf_start}
          orfStop={orf.orf_stop}
          peptideId={orf.peptide_id}
          domains={orf.domains}
        />
      ))
    ) : (
      <div />
    );
  return (
    <Card bordered={false} id={`cluster-${props.clusterId}`}>
      <Space direction="vertical" size={50}>
        {props.showDescription && (
          <Row>
            <Descriptions
              style={{ width: '100%' }}
              layout="vertical"
              column={{ xs: 8, sm: 16, md: 24 }}
              bordered={props.bordered}
            >
              <Descriptions.Item span={1} label="BGC ID">
                {props.clusterId}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="BGC Start">
                {props.clusterStart}
              </Descriptions.Item>
              <Descriptions.Item span={1} label="BGC Stop">
                {props.clusterStop}
              </Descriptions.Item>
              {props.additionalDescriptions}
              <Descriptions.Item span={1} label="Analyses Available">
                {/* <WindowsOutlined /> */}
                <AppleOutlined
                  onClick={() =>
                    props.history.push(
                      `/apps/quince/results/${props.clusterId}`,
                    )
                  }
                />
                {/* <AndroidOutlined /> */}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        )}
        <Row>
          <Space size={[8, 16]} wrap>
            {props.orfLoadingStatus ? <Spin /> : orfs}
          </Space>
        </Row>
      </Space>
    </Card>
  );
}

Cluster.propTypes = {
  orfLoadingStatus: PropTypes.bool,
  clusterId: PropTypes.number,
  clusterStart: PropTypes.number,
  clusterStop: PropTypes.number,
  orfs: PropTypes.array,
  bordered: PropTypes.bool,
  showDescription: PropTypes.bool,
  additionalDescriptions: PropTypes.node,
  history: PropTypes.any,
};

export default withRouter(memo(Cluster));
