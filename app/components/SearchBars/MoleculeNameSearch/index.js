import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AutoComplete, Input, Space } from 'antd';

function MoleculeNameSearch(props) {
  function searchHandler(queryStr) {
    props.history.push(`/apps/passport/search/smallmolecule_name/${queryStr}`);
  }
  return (
    <Space direction="vertical">
      <AutoComplete
        defaultActiveFirstOption={false}
        filterOption={false}
        defaultValue={props.queryStr}
      >
        <Input.Search
          style={{ width: '50vw' }}
          size="large"
          placeholder="Enter the name of a molecule e.g. vancomycin"
          enterButton
          allowClear
          onSearch={searchHandler}
        />
      </AutoComplete>
    </Space>
  );
}

MoleculeNameSearch.propTypes = {
  history: PropTypes.object,
  queryStr: PropTypes.string,
};

export default withRouter(memo(MoleculeNameSearch));
