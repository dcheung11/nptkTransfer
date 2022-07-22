import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Space } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import style from '../../../../containers/MultiLoginPage/styles.less';
import mLabLogo from '../../../../../public/images/magarvey-logo.png';

function InternalLoginPane(props) {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '90vh' }}
    >
      <Col span={12}>
        <div className={style.container}>
          <Space direction="vertical" size={60}>
            <img
              src={mLabLogo}
              style={{ height: '40vh' }}
              alt="Magarvey Laboratories"
              className={style.logo}
            />
            <div className={style.container}>
              <Button
                onClick={props.loginFunction}
                className={props.loginButtonStyle}
                icon={<GoogleOutlined />}
                size="large"
              >
                Google Sign-in
              </Button>
            </div>
          </Space>
        </div>
      </Col>
      <Col span={12} />
    </Row>
  );
}

InternalLoginPane.propTypes = {
  loginButtonStyle: PropTypes.string,
  loginFunction: PropTypes.func,
};

export default memo(InternalLoginPane);
