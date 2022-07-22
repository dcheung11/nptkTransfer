import React, { memo } from 'react';
import DotLoader from 'react-spinners/DotLoader';
import PropType from 'prop-types';
import { Row, Divider, Button } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styles from './styles.less';
import { useInjectSaga } from '../../../utils/injectSaga';
import limsSaga from '../../../data/cactus/lims/sagas';
import { useInjectReducer } from '../../../utils/injectReducer';
import limsReducer from '../../../data/cactus/lims/reducers';
import { createExtract } from '../../../data/cactus/lims/actions';
import BarChart from '../../BI/BarChart';

function Playground(props) {
  useInjectSaga({ key: 'cluster', saga: limsSaga });
  useInjectReducer({ key: 'cluster', reducer: limsReducer });
  const dispatch = useDispatch();

  const cultureForm = [
    {
      taxonomy: {
        taxonomy_id: 6969,
      },
      culture: {
        medium_id: 69,
        inoculation_date: '1991-12-22',

        researcher_id: 19,
        organization_id: '2b594662-1d0b-11ea-ba3e-fb1ef5ad7ebb',
        experiment_class_id: 6,
        fermentation_volume: 50,
        fermentation_temperature: 28,
        replicons: 0,
        comments: 'Hey this is comment made by Keshav - Sagas',
      },
    },
  ];
  /* Axios Form submit */
  // console.log(
  //   axios.post('https://cactus.magarveylab.ca/api/culture', cultureForm, {
  //     headers: {
  //       Authorization: `Auth0 ${localStorage.token}`,
  //     },
  //   }),
  // );

  /* Saga create */
  console.log(
    fetch('https://cactus.magarveylab.ca/api/culture', {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Auth0 ${localStorage.token}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(cultureForm),
    }),
  );

  // console.log(
  //   axios({
  //     method: 'post',
  //     url: 'https://cactus.magarveylab.ca/api/culture',
  //     headers: {
  //       Authorization: `Auth0 ${localStorage.token}`,
  //     },
  //     data: cultureForm,
  //   }),
  // );
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
        <h1>This is a playground</h1>
      </Row>
      <Button
        onClick={() =>
          dispatch(
            createExtract({
              bearerToken: localStorage.token,
              formData: cultureForm,
            }),
          )
        }
      >
        bruh
      </Button>
      <BarChart
        categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        allSeriesData={[
          {
            seriesName: 'Direct',
            seriesData: [320, 302, 301, 334, 390, 330, 320],
          },
        ]}
      />
    </div>
  );
}

Playground.propTypes = {
  color: PropType.string,
  loading: PropType.bool,
  message: PropType.string,
  size: PropType.number,
};

Playground.defaultProps = {
  color: '#1890ff',
  loading: true,
  message: 'Loading',
  size: 80,
};

export default memo(Playground);
