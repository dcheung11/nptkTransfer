import { Menu, Avatar, Space, Image } from 'antd';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import styles from './styles.less';
import leafLogo from '../../../../public/images/agro-white.png';
import defaultProfile from '../../../../public/images/default_profile.png';

const { SubMenu } = Menu;
const headerHeight = '5vh';

function Header(props) {
  return (
    <Menu
      mode="horizontal"
      style={{
        height: headerHeight,
        backgroundColor: '#323232',
        borderBottom: 'none',
      }}
    >
      <Menu.Item
        key="0"
        align="middle"
        style={{ float: 'left', height: headerHeight }}
        onClick={() => props.history.push('/apps')}
      >
        <Space direction="horizontal">
          <Avatar src={leafLogo} style={{ marginBottom: '15px' }} />
          <h1
            id="app-name"
            className={styles.appName}
            style={{ float: 'left' }}
          >
            {props.appName}
          </h1>
        </Space>
      </Menu.Item>
      <SubMenu
        key="2"
        style={{ float: 'right', height: headerHeight }}
        title={
          <Avatar
            size={headerHeight}
            src={
              props.user ? (
                props.user.picture
              ) : (
                <Image src={defaultProfile} preview={false} />
              )
            }
          />
        }
      >
        <Menu.Item
          key="setting:1"
          icon={<LogoutOutlined />}
          onClick={() => props.history.push('/apps/profile')}
        >
          Profile Info
        </Menu.Item>
        <Menu.Item
          key="setting:2"
          icon={<LogoutOutlined />}
          onClick={() => props.logoutFunction()}
        >
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  appName: PropTypes.string.isRequired,
  logoutFunction: PropTypes.func,
};

export default withRouter(memo(Header));
