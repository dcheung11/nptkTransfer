import React, { memo } from 'react';
import PropType from 'prop-types';
import { Typography } from 'antd';
import CountUp from 'react-countup';
const { Title } = Typography;

function StatisticCounter(props) {
  return (
    <div>
      <Title style={{ fontWeight: 'lighter' }} level={1}>
        <CountUp start={0} end={props.value} separator="," {...props} />
      </Title>
      <Title style={{ color: '#007788' }} level={5}>
        {props.title}
      </Title>
    </div>
  );
}

StatisticCounter.propTypes = {
  value: PropType.number,
  title: PropType.string,
};

export default memo(StatisticCounter);
