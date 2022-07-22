import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function AssemblyDescriptionDiv(props) {
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
              We designed <i>Puffin</i> as a light-weight open-source
              biosynthetic gene cluster caller. Written in Python, Puffin uses
              PRODIGAL for open-reading-frame determination and a hand-curated
              library of HMMER-built HMMs to recognize conserved enzymatic
              domains. A greedy algorithm is applied to group together
              biosynthetic domains within close genetic proximity. Substrates
              are predicted for adenylation and acyl-adenylating domains using
              deep learning models.
            </Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

AssemblyDescriptionDiv.propTypes = {
  history: PropTypes.object,
};

export default withRouter(memo(AssemblyDescriptionDiv));
