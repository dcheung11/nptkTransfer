import { Divider, Button, Space, Row, Col, Modal } from 'antd';
import React, { memo } from 'react';
import {
  InfoCircleOutlined,
  SearchOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './styles.less';

function Footer(props) {
  function about() {
    Modal.info({
      title: 'Welcome to the Natural Product Toolkit! ',
      content: (
        <div>
          <p>Open up a couple of the apps and explore our genomic platform.</p>
        </div>
      ),
      onOk() {},
    });
  }
  function license() {
    Modal.info({
      title: 'Copyright 2020 Magarvey Laboratories.',
      content: (
        <div>
          <p>
            Licensed under the Apache License, Version 2.0 (the "License"); you
            may not use this file except in compliance with the License. You may
            obtain a copy of the License at
          </p>
          <a>http://www.apache.org/licenses/LICENSE-2.0</a>
          <hr />
          <p>
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
            implied. See the License for the specific language governing
            permissions and limitations under the License.
          </p>
        </div>
      ),
      onOk() {},
    });
  }
  return (
    <div>
      <Row
        type="flex"
        justify="center"
        style={{ backgroundColor: props.color, color: 'grey' }}
      >
        <Space>
          <Col span={2}>
            <Button
              icon={<InfoCircleOutlined />}
              onClick={() => about()}
              type="link"
              style={{ color: 'grey' }}
            >
              About
            </Button>
          </Col>
          <Col span={2}>
            <Divider type="vertical" />
          </Col>
          <Col span={2}>
            <Button
              type="link"
              icon={<ExceptionOutlined />}
              onClick={() => license()}
              style={{ color: 'grey' }}
            >
              License
            </Button>
          </Col>
          <Col span={2}>
            <Divider type="vertical" />
          </Col>
          <Col span={2}>
            <Button
              type="link"
              icon={<SearchOutlined />}
              style={{ color: 'grey' }}
            >
              FAQ
            </Button>
          </Col>
        </Space>
      </Row>
    </div>
  );
}

export default withRouter(memo(Footer));
