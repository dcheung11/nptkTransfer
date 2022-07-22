import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AutoComplete, Space, Input } from 'antd';

function ActivitySearch(props) {
  /*
  Cosmetics
  */
  const options = [
    {
      value: 'Hematology',
    },
    {
      value: 'Skeletal system',
    },
    {
      value: 'Cardiology',
    },
    {
      value: 'Siderophore',
    },
    {
      value: 'Sexual reproduction',
    },
    {
      value: 'Virus',
    },
    {
      value: 'Cardiovascular system',
    },
    {
      value: 'Toxin Class II',
    },
    {
      value: 'No activity',
    },
    {
      value: 'Bacteria',
    },
    {
      value: 'Urology',
    },
    {
      value: 'Toxin Class III',
    },
    {
      value: 'Endocrine system',
    },
    {
      value: 'Algae',
    },
    {
      value: 'Toxin general',
    },
    {
      value: 'Fish',
    },
    {
      value: 'Muscular system',
    },
    {
      value: 'Immunomodulator',
    },
    {
      value: 'Prokaryote',
    },
    {
      value: 'Cancer',
    },
    {
      value: 'Toxin Class I',
    },
    {
      value: 'Diabetes',
    },
    {
      value: 'Insect',
    },
    {
      value: 'Dermatology',
    },
    {
      value: 'Hormone',
    },
    {
      value: 'Eukaryote',
    },
    {
      value: 'Respiratory system',
    },
    {
      value: 'Nervous system',
    },
    {
      value: 'Ocular system',
    },
    {
      value: 'Molluscs',
    },
    {
      value: 'Renal system',
    },
    {
      value: 'Plant',
    },
    {
      value: 'Fungi',
    },
    {
      value: 'Parasite',
    },
    {
      value: 'Toxin Class IV',
    },
    {
      value: 'Digestive system',
    },
    {
      value: 'Reproductive system',
    },
  ].sort(function(a, b) {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

  return (
    <Space direction="vertical">
      <AutoComplete
        options={options}
        defaultActiveFirstOption={false}
        defaultValue={props.activityStr}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input.Search
          style={{ width: '50vw' }}
          size="large"
          placeholder="Type in an activity category! e.g. Toxin Class IV"
          enterButton
          allowClear
          onSearch={(value, option) =>
            props.history.push(`/apps/passport/search/activity/${value}`)
          }
        />
      </AutoComplete>
    </Space>
  );
}

ActivitySearch.propTypes = {
  history: PropTypes.object,
  activityStr: PropTypes.string,
};

export default withRouter(memo(ActivitySearch));
