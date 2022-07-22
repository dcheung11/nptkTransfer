import React, { memo, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AutoComplete, Input, Space } from 'antd';

const key = 'taxonomy';

function SmilesSearch(props) {
  const [options, setOptions] = useState([]);
  function searchHandler(smilesStr) {
    props.history.push(`/apps/passport/search/smiles/${smilesStr}`);
  }
  return (
    <Space direction="vertical">
      <AutoComplete
        options={options}
        defaultActiveFirstOption={false}
        filterOption={false}
        defaultValue={props.smilesStr}
      >
        <Input.Search
          style={{ width: '50vw' }}
          size="large"
          placeholder="Enter a SMILES string ex. CN1C=NC2=C1C(=O)N(C(=O)N2C)C"
          enterButton
          allowClear
          onSearch={searchHandler}
        />
      </AutoComplete>
    </Space>
  );
}

SmilesSearch.propTypes = {
  history: PropTypes.object,
  smilesStr: PropTypes.string,
};

export default withRouter(memo(SmilesSearch));
