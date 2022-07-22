/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  Empty,
  Row,
  Col,
  Divider,
  Tabs,
  Descriptions,
  Statistic,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';

function TaxInfo(props) {
  const { Title } = Typography;
  const [drawerData, setDrawerData] = useState(props.drawerData);

  useEffect(() => {
    setDrawerData(props.drawerData);
  }, [props.drawerData]);

  const taxLevels = [
    'kingdom',
    'phylum',
    'class',
    'order',
    'family',
    'genus',
    'species',
    'strain',
  ];

  function startsWithTags(start, key) {
    return (
      <Tabs.TabPane tab={start} key={key}>
        <Descriptions size="small" bordered>
          {Object.keys(drawerData.data.info)
            .filter(tag => tag.startsWith(start))
            .map(item => (
              <Descriptions.Item label={item.replace(/_/g, ' ')}>
                {drawerData.data.info[item]}
              </Descriptions.Item>
            ))}
        </Descriptions>
      </Tabs.TabPane>
    );
  }

  function endsWithTags(end, key) {
    return (
      <Tabs.TabPane tab={end} key={key}>
        <Descriptions size="small" bordered>
          {Object.keys(drawerData.data.info)
            .filter(tag => tag.endsWith(end))
            .map(item => (
              <Descriptions.Item label={item.replace(/_/g, ' ')}>
                {drawerData.data.info[item]}
              </Descriptions.Item>
            ))}
        </Descriptions>
      </Tabs.TabPane>
    );
  }

  return Object.keys(drawerData).length === 0 ? (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title level={3} type="secondary">
        Click on strain to display data
      </Title>
      <Empty />
    </Card>
  ) : (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title level={3} type="secondary">
        Strain #{props.drawerData.data.info.taxonomy_id} info:{' '}
        {props.drawerData.data.name}
      </Title>
      <Row gutter={16}>
        {props.drawerData.treePathInfo.slice(1).map((item, index) => (
          <Col span={6}>
            <Statistic title={taxLevels[index]} value={item.name} />{' '}
          </Col>
        ))}
      </Row>
      <Divider />
      <Tabs defaultActiveKey="1">
        {endsWithTags('hits', 1)}
        <Tabs.TabPane tab="known" key={2}>
          <Row>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                <Descriptions.Item label="known families">
                  {drawerData.data.info.known_families}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                {Object.keys(drawerData.data.info)
                  .filter(
                    tag =>
                      tag.startsWith('known_anti') ||
                      tag.startsWith('known_he'),
                  )
                  .map(item => (
                    <Descriptions.Item label={item.replace(/_/g, ' ')}>
                      {drawerData.data.info[item]}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Col>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                {Object.keys(drawerData.data.info)
                  .filter(
                    tag =>
                      tag.startsWith('known') &&
                      !tag.includes('anti') &&
                      !tag.includes('families') &&
                      !tag.startsWith('he'),
                  )
                  .map(item => (
                    <Descriptions.Item label={item.replace(/_/g, ' ')}>
                      {drawerData.data.info[item]}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="novel" key={3}>
          <Row>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                <Descriptions.Item label="novel families">
                  {drawerData.data.info.novel_families}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                {Object.keys(drawerData.data.info)
                  .filter(tag => tag.startsWith('novel_pear'))
                  .map(item => (
                    <Descriptions.Item label={item.replace(/_/g, ' ')}>
                      {drawerData.data.info[item]}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Col>
            <Col flex={5 / 3}>
              <Descriptions size="small" bordered column={1}>
                {Object.keys(drawerData.data.info)
                  .filter(tag => tag.startsWith('novel_plume'))
                  .map(item => (
                    <Descriptions.Item label={item.replace(/_/g, ' ')}>
                      {drawerData.data.info[item]}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
export default TaxInfo;
