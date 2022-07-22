import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Space } from 'antd';
import { Helmet } from 'react-helmet';
import LogoutHeader from '../../../../containers/LogoutHeader';
import LandingProfile from '../../../ImageWrappers/ProfilePic';
import AppDrawer from '../OldAppDrawer';
import LandingFooter from '../../Footer';
import { apps } from './landingApps';
const { Content } = Layout;

function AppsLanding(props) {
  return (
    <div>
      <Helmet>
        <title>Natural Product Toolkit - NPTK </title>
      </Helmet>
      <Layout>
        <LogoutHeader />
        <Content style={{ backgroundColor: '#ffffff' }}>
          <Row type="flex" justify="center" align="middle">
            <Space direction="vertical">
              <LandingProfile
                firstName={props.firstName}
                lastName={props.lastName}
                user={props.user}
              />
              <AppDrawer appData={apps} roles={props.roles} />
            </Space>
          </Row>
        </Content>
        <LandingFooter color="white" />
      </Layout>
    </div>
  );
}

AppsLanding.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  user: PropTypes.object,
  roles: PropTypes.array,
};

export default memo(AppsLanding);
