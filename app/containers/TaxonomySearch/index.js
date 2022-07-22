import React, { memo, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Space, Typography, Input } from 'antd';

import PropTypes from 'prop-types';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import {
  ajaxNameSearch,
  fetchTaxonomy,
} from '../../data/cactus/taxonomy/actions';
import saga from '../../data/cactus/taxonomy/sagas';
import reducer from '../../data/cactus/taxonomy/reducers';
import { makeSelectNames } from '../../data/cactus/taxonomy/selectors';
import TagTaxonomy from '../../components/Tags/TagTaxonomy';

const { Text } = Typography;
const key = 'taxonomy';

function TaxonomySearch(props) {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const selectNames = makeSelectNames();
  const names = useSelector(selectNames);
  const dispatch = useDispatch();
  /*
  AJAX
   */
  const taxonomyNameFetch = useCallback(
    value =>
      dispatch(
        ajaxNameSearch({
          bearerToken: localStorage.token,
          nameStr: value,
        }),
      ),
    [dispatch],
  );
  /*
  Fetch Selection
  */
  const taxonomyFetch = option => {
    dispatch(
      fetchTaxonomy({
        bearerToken: localStorage.token,
        taxonomyId: option.taxonomyid,
      }),
    );
    props.history.push(`/apps/taxonomy/results/${option.taxonomyid}`);
  };
  /*
  Cosmetics
  */
  const [options, setOptions] = useState([]);
  function optionUpdate(value) {
    taxonomyNameFetch(value);
    const newOptions = names.map(node => ({
      value: node.path.split('.').slice(-1),
      label: (
        <div>
          <TagTaxonomy rank={node.rank} />
          <Text>
            {node.path
              .split('.')
              .slice(-2) // Show only the last two nodes of the taxonomy-path
              .join('>')}
          </Text>
        </div>
      ),
      path: node.path,
      taxonomyid: node.taxonomy_id, // Not CamelCase bc custom attribute
      key: node.taxonomy_id,
      rank: node.rank,
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
        onSearch={handleSearch}
        onSelect={
          props.onSelect
            ? props.onSelect
            : (value, option) => taxonomyFetch(option)
        }
      >
        <Input.Search
          style={{ width: '50vw' }}
          size="large"
          placeholder="Type in the taxonomy node! e.g. Streptomyces"
          enterButton={props.enterButton}
          allowClear
          onSearch={props.onSearch}
        />
      </AutoComplete>
    </Space>
  );
}

TaxonomySearch.propTypes = {
  history: PropTypes.object,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  enterButton: PropTypes.bool,
};

export default withRouter(memo(TaxonomySearch));
