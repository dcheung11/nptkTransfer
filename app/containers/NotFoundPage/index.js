/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, Card, Row, Space } from 'antd';
import BrokenLogo from '../../../public/images/broken-logo.png';
import messages from './messages';
const { Title } = Typography;
export default function NotFound() {
  return (
    <article>
      <Row
        style={{ minHeight: '100vh', backgroundColor: 'black' }}
        align="middle"
        justify="center"
      >
        <Card style={{ backgroundColor: 'black' }} bordered={false}>
          <Space direction="vertical" align="center">
            <img
              src={BrokenLogo}
              alt="Broken Image"
              style={{ height: '40vh' }}
            />
            <Title style={{ color: 'white' }}>
              <FormattedMessage {...messages.header} />
            </Title>
          </Space>
        </Card>
      </Row>
    </article>
  );
}
