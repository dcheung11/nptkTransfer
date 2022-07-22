import React, { memo, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Space, Typography, Input } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from '../../data/cactus/smallmolecule/sagas';
import reducer from '../../data/cactus/smallmolecule/reducers';

import { fetchTargetNames } from '../../data/cactus/smallmolecule/actions';

import { makeSelectTargetNames } from '../../data/cactus/smallmolecule/selectors';

const { Text } = Typography;
const key = 'smallmolecule';

function TargetSearch(props) {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const selectNames = makeSelectTargetNames();
  const names = useSelector(selectNames);
  const dispatch = useDispatch();
  /*
  AJAX
   */
  const targetNameFetch = useCallback(
    value =>
      dispatch(
        fetchTargetNames({
          bearerToken: localStorage.token,
          queryStr: value,
        }),
      ),
    [dispatch],
  );
  /*
  Cosmetics
  */
  const [options, setOptions] = useState([]);
  function optionUpdate(value) {
    targetNameFetch(value);
    const newOptions = names.map(node => ({
      value: node.name,
      label: `${node.target_id} - ${node.name}`,
      key: uuidv4(),
    }));
    setOptions(newOptions);
  }
  const handleSearch = value => {
    optionUpdate(value || []);
  };

  return (
    <Space direction="vertical">
      <AutoComplete
        options={options}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        defaultValue={props.targetStr}
      >
        <Input.Search
          style={{ width: '50vw' }}
          size="large"
          placeholder="Enter in a target search query! e.g. Cardiac"
          enterButton
          allowClear
          onSearch={(value, option) =>
            props.history.push(`/apps/passport/search/target/${value}`)
          }
        />
      </AutoComplete>
    </Space>
  );
}

TargetSearch.propTypes = {
  history: PropTypes.object,
  targetStr: PropTypes.string,
};

export default withRouter(memo(TargetSearch));
