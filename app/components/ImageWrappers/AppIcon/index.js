import React, { memo, useState } from 'react';
import { Avatar, Col, Space, Image } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles.less';

function AppIcon(props) {
  const [size, setSize] = useState(128);
  return (
    <Col span={props.span} id={props.id}>
      <div style={{ height: '15vh' }}>
        <Space direction="vertical">
          <Avatar
            shape="square"
            size={size}
            src={<Image src={props.src} preview={false} />}
            className={styles.icon}
            onClick={() => props.history.push(props.route)}
            onMouseEnter={() => setSize(156)}
            onMouseLeave={() => setSize(128)}
            style={{
              borderRadius: '20%',
              outline: 'none',
              borderColor: '#f4f4f4',
              boxShadow: '0 0 10px #f4f4f4',
              cursor: 'pointer',
            }}
          />
          <h3 className={styles.label}>{props.appName}</h3>
        </Space>
      </div>
    </Col>
  );
}

AppIcon.propTypes = {
  src: PropTypes.any,
  appName: PropTypes.string,
  id: PropTypes.number,
  span: PropTypes.number,
  history: PropTypes.object.isRequired,
  route: PropTypes.string,
};

export default withRouter(memo(AppIcon));
