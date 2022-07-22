import React, { memo, useState } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { LoadingOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import style from '../../../../containers/MultiLoginPage/styles.less';
import crowLogo from '../../../../../public/images/crow-logo.png';

function PublicLoginPane({ loginFunction, loginButtonStyle }) {
  const [loginIcon, setLoginIcon] = useState(<LockOutlined />);
  function onClickFunction() {
    loginFunction();
    setLoginIcon(<LoadingOutlined style={{ fontSize: 24 }} spin />);
  }
  return (
    <div className={style.container}>
      <Row
        type="flex"
        justify="right"
        align="top"
        style={{ minHeight: '90vh', marginTop: '100px' }}
      >
        <Col>
          <Space direction="vertical" size={90}>
            <Row justify="right">
              <Col>
                <img
                  src={crowLogo}
                  style={{ height: '35vh' }}
                  alt="Public Portal"
                  className={style.logo}
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Button
                  type="primary"
                  icon={loginIcon}
                  size="large"
                  onClick={() => onClickFunction()}
                  className={loginButtonStyle}
                >
                  Continue as guest
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

PublicLoginPane.propTypes = {
  loginFunction: PropTypes.func,
  loginButtonStyle: PropTypes.string,
};

export default memo(PublicLoginPane);
