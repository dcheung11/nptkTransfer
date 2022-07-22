import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Divider,
  Layout,
  Row,
  Space,
  Typography,
} from 'antd';
import { ArrowLeftOutlined, ProfileOutlined } from '@ant-design/icons';
import LogoutHeader from '../../../containers/LogoutHeader';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
const { Sider, Content } = Layout;
const { Title } = Typography;
function ProfilePassport(props) {
  return (
    <div>
      <Helmet>
        <title> {props.user.nickname} - Profile Passport</title>
        <meta name="description" content="Puffin Passport" />
      </Helmet>
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <LogoutHeader />
        <Layout>
          <Sider style={{ backgroundColor: 'white' }}>
            <Row
              style={{ minHeight: '10vh' }}
              type="flex"
              justify="center"
              align="middle"
            >
              <Col>
                <ArrowLeftOutlined
                  style={{
                    color: 'black',
                    fontSize: '32px',
                  }}
                  onClick={() => props.history.push('/apps')}
                />
              </Col>
            </Row>
          </Sider>
          <Content id="passport-info" style={{ backgroundColor: 'white' }}>
            <Space direction="vertical">
              <Card id="passport-header-section" bordered={false}>
                <Row>
                  <PassportTypeIcon passportType="genome" />
                  <Title>Profile Entry: {props.user.email} </Title>
                </Row>
              </Card>
              <Card
                id="passport-details"
                bordered={false}
                style={{ backgroundColor: 'white', minWidth: 1000 }}
              >
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Summary
                </Divider>
                <Row wrap={false} gutter={16}>
                  <Col span={8}>
                    <Avatar src={props.user.picture} />
                  </Col>
                  <Col span={16}>
                    <Descriptions bordered>
                      <Descriptions.Item label="Nickname">
                        {props.user.nickname}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {props.user.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email Verified">
                        {`${props.user.email_verified}`}
                      </Descriptions.Item>
                      <Descriptions.Item label="Name">
                        {props.user.name}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
ProfilePassport.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
};

export default withRouter(memo(ProfilePassport));
