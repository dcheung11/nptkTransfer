import React, { memo, useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { Helmet } from 'react-helmet';
import { Tabs, Layout, message, Typography } from 'antd';

import PublicLoginPane from '../../components/Layouts/Login/PublicLoginPane';
import InviandLoginPane from '../../components/Layouts/Login/InviandLoginPane';
import InternalLoginPane from '../../components/Layouts/Login/InternalLoginPane';
import loginPortalMetaData from './loginPortalMetaData';
import { capitalizeFirstLetter } from '../../utils/texthelper';
import './styles.less';
const { Content } = Layout;
const { TabPane } = Tabs;
const queryString = require('query-string');

function MultiLoginPage(props) {
  // Set Default tab dynamically base on Param
  const { entry } = useParams();

  const [activeTab, setActiveTab] = useState(
    entry in loginPortalMetaData ? entry : 'external',
  );

  // Auth0 Login
  const path = '/apps';
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push(path);
    }
  }, [isAuthenticated]);

  // Error Messages
  // eslint-disable-next-line no-restricted-globals
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !!parsed &&
      !!parsed.error &&
      !!parsed.error_description &&
      message.error(
        <>
          {capitalizeFirstLetter(parsed.error)}: {parsed.error_description}{' '}
          <Typography.Link
            onClick={() =>
              logout({ returnTo: `${window.location.origin}/nptk` })
            }
          >
            Logout?
          </Typography.Link>
        </>,
        0,
      );
  }, [!!parsed.error]);

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Portal for Toolkit Selection" />
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Content className={loginPortalMetaData[activeTab].bg}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered="true"
            className={loginPortalMetaData[activeTab].tabStyle}
          >
            {/* Magarvey Laboratories Pane */}
            <TabPane tab="Internal" key="internal">
              <InternalLoginPane
                loginFunction={() => loginWithRedirect()}
                loginButtonStyle={loginPortalMetaData[activeTab].login}
              />
            </TabPane>
            {/* Inviand Pane */}
            <TabPane tab="External" key="external">
              <InviandLoginPane
                loginFunction={() => loginWithRedirect()}
                loginButtonStyle={loginPortalMetaData[activeTab].login}
              />
            </TabPane>
            {/* Public Pane */}
            <TabPane tab="Public" key="public">
              <PublicLoginPane
                loginFunction={() => loginWithRedirect()}
                loginButtonStyle={loginPortalMetaData[activeTab].login}
              />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

MultiLoginPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(memo(MultiLoginPage));
