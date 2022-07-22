import { Row, Space } from 'antd';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppIcon from '../../../ImageWrappers/AppIcon';

const iconsPerRow = 6;
const iconSpacer = 32;
const rowSpacer = 8;
const appDrawerHeight = '55vh';
const maxAvatarSize = 256;

function AppDrawer({ appData, roles }) {
  let i;
  let j;
  let appRow;
  const drawer = [];
  const trimmedApps = appData.filter(
    app =>
      (!!app.requiredRole && roles.includes(app.requiredRole)) ||
      app.requiredRole === undefined,
  );
  for (i = 0, j = trimmedApps.length; i < j; i += iconsPerRow) {
    appRow = trimmedApps.slice(i, i + iconsPerRow);
    const appIcons = appRow.map(app => (
      <AppIcon
        id={app.id}
        key={app.id}
        appName={app.name}
        src={app.src}
        route={app.route}
        span={3}
      />
    ));
    drawer.push(
      <Row
        key={i}
        style={{ minHeight: maxAvatarSize }}
        justify="center"
        align="middle"
        type="flex"
      >
        <Space align="center" size={iconSpacer}>
          {appIcons}
        </Space>
      </Row>,
    );
  }
  return (
    <Row style={{ minHeight: appDrawerHeight }} type="flex" justify="center">
      <Space align="center" size={rowSpacer} direction="vertical">
        {drawer}
      </Space>
    </Row>
  );
}

AppDrawer.propTypes = {
  appData: PropTypes.array,
  roles: PropTypes.array,
};

export default withRouter(memo(AppDrawer));
