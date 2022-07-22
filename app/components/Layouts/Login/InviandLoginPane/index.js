import React, { memo } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import style from '../../../../containers/MultiLoginPage/styles.less';
import inviandLogo from '../../../../../public/images/inviand-logo.png';
import { Auth0Icon } from '../../../Iconography/Icons';

function InviandLoginPane(props) {
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '75vh' }}
    >
      <Col span={12}>
        <div className={style.container}>
          <img
            src={inviandLogo}
            style={{ height: '30vh' }}
            alt="Inviand"
            className={style.logo}
          />
        </div>
        <div className={style.container}> </div>
      </Col>
      <Col span={12}>
        <div className={style.container} style={{ marginTop: '22%' }}>
          <div className={style.container}>
            <Button
              onClick={props.loginFunction}
              type="primary"
              icon={<Auth0Icon />}
              htmlType="submit"
              size="large"
              className={props.loginButtonStyle}
            >
              Authenticate
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

InviandLoginPane.propTypes = {
  loginButtonStyle: PropTypes.string,
  loginFunction: PropTypes.func,
};

export default memo(InviandLoginPane);
