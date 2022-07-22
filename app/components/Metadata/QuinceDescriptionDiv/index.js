import React, { memo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function QuinceDescriptionDiv(props) {
  return (
    <Card style={{ backgroundColor: 'black' }} bordered={false}>
      <Row
        style={{ minHeight: '30vh' }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col span={2}>
          <ArrowLeftOutlined
            style={{
              color: 'white',
              fontSize: '32px',
            }}
            onClick={() => props.history.push('/apps')}
          />
        </Col>
        <Col span={18}>
          <Card style={{ backgroundColor: 'black' }} bordered={false}>
            <Title style={{ color: 'white' }}> About</Title>
            <Text style={{ color: 'white' }}>
              <b>Quince</b> is a new metric for comparing biosynthetic gene
              clusters. A query BGC is annotated with biosynthetically relevant
              annotations from the InterPro consortium. These features are used
              to characterize and quantify biosynthetic differences between BGCs
              using wickedly fast algorithms. Use Quince to see which microbes
              contain BGCs similar to your own!
            </Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

QuinceDescriptionDiv.propTypes = {
  history: PropTypes.object,
};

export default withRouter(memo(QuinceDescriptionDiv));
