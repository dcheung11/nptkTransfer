import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Row, Typography, Space, Table } from 'antd';
const { Title, Paragraph } = Typography;

function QuinceKnownDiv(props) {
  return (
    <Card style={{ backgroundColor: 'white' }} bordered={false}>
      <Row type="flex" justify="center" align="middle">
        <Col span={2} />
        <Col span={18}>
          <Card
            style={{ backgroundColor: 'white', minHeight: '40vh' }}
            bordered={false}
          >
            <Title style={{ color: 'black' }}> Try it out!</Title>
            <Paragraph>
              Below we have a curated dataset of known biosynthetic gene
              clusters scraped from a variety of sources including publications,
              IMG-ABC and MiBiG! Click on a cluster of interest and see what
              relatives it has!
            </Paragraph>
            <Space direction="vertical" align="center">
              <Row justify="center">
                <Col>
                  <Table columns={props.columns} dataSource={props.data} />
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

QuinceKnownDiv.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default memo(QuinceKnownDiv);
