import React, { memo } from 'react';
import DotLoader from 'react-spinners/DotLoader';
import PropType from 'prop-types';
import { Row, Divider } from 'antd';
import styles from './styles.less';

function LoadingFancy(props) {
  return (
    <div>
      <Divider style={{ opacity: 0, marginBottom: '50px' }} />
      <Row align="center" justify="center">
        <DotLoader
          color={props.color}
          size={props.size}
          loading={props.loading}
          className={styles.pacman}
        />
      </Row>
      <Divider style={{ opacity: 0, marginBottom: '50px' }} />
      <Row align="center" justify="center">
        <h1>{props.message}</h1>
      </Row>
    </div>
  );
}

LoadingFancy.propTypes = {
  color: PropType.string,
  loading: PropType.bool,
  message: PropType.string,
  size: PropType.number,
};

LoadingFancy.defaultProps = {
  color: '#1890ff',
  loading: true,
  message: 'Loading',
  size: 80,
};

export default memo(LoadingFancy);
