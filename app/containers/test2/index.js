/* eslint-disable react-hooks/rules-of-hooks */
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import {
  Space,
  Form,
  Input,
  InputNumber,
  Descriptions,
  DatePicker,
  AutoComplete,
  Typography,
  Spin,
  Select,
} from 'antd';
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';
import taxonomySaga from './sagas';
import taxonomyReducer from './reducers';
import { createTaxonomyNodeRequest } from './actions';

const strainBody = require('./sagatest.json');

/* eslint-disable react/no-array-index-key */
export function test2() {
  const key = 'test2';
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer: taxonomyReducer });
  useInjectSaga({ key, saga: taxonomySaga });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <div className="App">
      <h1>damien saga test</h1>
      <button
        type="submit"
        onClick={() =>
          dispatch(
            createTaxonomyNodeRequest({
              ...strainBody,
              bearerToken: localStorage.token,
            }),
          )
        }
      >
        post node
      </button>
    </div>
  );
}

export default withRouter(memo(test2));
