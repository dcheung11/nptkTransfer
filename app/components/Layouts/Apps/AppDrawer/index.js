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

function AppDrawer({ appData }) {
  let i;
  let j;
  let appRow;
  const drawer = [];
  for (i = 0, j = appData.length; i < j; i += iconsPerRow) {
    appRow = appData.slice(i, i + iconsPerRow);
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
};

export default withRouter(memo(AppDrawer));
