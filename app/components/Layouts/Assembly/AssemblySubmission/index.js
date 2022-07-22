import React, { memo } from 'react';
import { Row, Card, Typography, Col } from 'antd';
import AssemblyForm from '../../../Forms/AssemblyForm';
const { Title, Paragraph } = Typography;

// eslint-disable-next-line no-unused-vars
function AssemblySubmission(props) {
  return (
    <Card style={{ backgroundColor: 'white' }} bordered={false}>
      <Row type="flex" justify="center" align="middle">
        <Col span={2} />
        <Col span={18}>
          <Card bordered={false}>
            <Title>Submit for Assembly</Title>
            <Paragraph>This is some information for a paragraph</Paragraph>
            <AssemblyForm />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default memo(AssemblySubmission);
