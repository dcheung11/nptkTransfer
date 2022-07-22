import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet/es/Helmet';
import { Layout, Tabs } from 'antd';
import LogoutHeader from '../../../../containers/LogoutHeader';

const { Content, Sider } = Layout;

function Leaderboard(props) {
  return (
    <div>
      <Helmet>
        <title>Leaderboards</title>
        <meta name="description" content="Leaderboards" />
      </Helmet>
      <Layout>
        <LogoutHeader />
        <Layout>
          <Sider style={{ backgroundColor: 'white' }} />
          <Content style={{ backgroundColor: 'white' }}>
            <Tabs defaultActiveKey="active-molecules" centered>
              {props.panes}
            </Tabs>
          </Content>
          <Sider style={{ backgroundColor: 'white' }} />
        </Layout>
      </Layout>
    </div>
  );
}

Leaderboard.propTypes = {
  panes: PropTypes.array,
};

export default memo(Leaderboard);
