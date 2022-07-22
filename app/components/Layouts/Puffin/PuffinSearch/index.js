import { Card, Col, Row, Space, Input, Typography } from 'antd';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;
const { Search } = Input;

function PuffinSearch(props) {
  return (
    <Card style={{ backgroundColor: props.bgColor }} bordered={false}>
      <Row
        style={{ minHeight: '40vh' }}
        type="flex"
        justify="center"
        align="middle"
      >
        <Col span={2} />
        <Col span={18}>
          <Card style={{ backgroundColor: props.bgColor }} bordered={false}>
            <Title style={{ color: props.fontColor }}>View your results</Title>
            <Space direction="vertical" size={35}>
              <Text style={{ color: props.fontColor }}>
                Enter in a job ID into the search bar and we will fetch your
                results. The job IDs can be used to share results with others.
                At the moment, results are stored on our servers for an
                indefinite amount of time.
              </Text>
              <Row justify="center">
                <Col span={14}>
                  <Search
                    placeholder="123e4567-e89b-12d3-a456-426614174000"
                    onSearch={props.onSearch}
                    defaultValue={props.defaultValue}
                    enterButton
                  />
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

PuffinSearch.propTypes = {
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  onSearch: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default memo(PuffinSearch);
