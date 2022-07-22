import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Input, Space } from 'antd';
import { CloudUploadOutlined, SearchOutlined } from '@ant-design/icons';
import ExtractTable from '../ExtractTable';
import ExtractFormWithSubmission from '../../../containers/ExtractFormWIthSubmission';
// import Highlighter from 'react-highlight-words';

function CultureExtractTable(props) {
  /* Table Parameters */
  const colWidth = 130;

  const [setSearchText] = useState('');
  const [setSearchedColumn] = useState('');

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),

    /* render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ), */
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: colWidth,

      onFilter: (value, record) =>
        record.status
          ? record.status
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Researcher',
      dataIndex: 'user_details',
      key: 'userDetails',
      width: colWidth,

      onFilter: (value, record) =>
        record.user_details.first_name
          ? record.user_details.first_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      render: record => (record ? record.initials || record.first_name : null),
      ...getColumnSearchProps('user_details'),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'createDate',
      width: colWidth,

      onFilter: (value, record) =>
        record.created_date
          ? new Date(Date.parse(record.created_date))
            .toLocaleDateString('en-US')
            .includes(value.toLowerCase())
          : false,
      render: record =>
        new Date(Date.parse(record)).toLocaleDateString('en-US'),
      ...getColumnSearchProps('created_date'),
    },
    {
      title: 'Inoculation Date',
      dataIndex: 'inoculation_date',
      key: 'inoculationDate',
      width: colWidth,

      onFilter: (value, record) =>
        record.inoculation_date
          ? new Date(Date.parse(record.inoculation_date))
            .toLocaleString('en-US')
            .includes(value.toLowerCase())
          : false,
      render: record =>
        record
          ? new Date(Date.parse(record)).toLocaleDateString('en-US')
          : null,
      ...getColumnSearchProps('inoculation_date'),
    },
    {
      title: 'Fermentation Volume',
      dataIndex: 'fermentation_volume',
      key: 'fermentationVolume',
      width: colWidth,

      onFilter: (value, record) =>
        record.fermentation_volume
          ? record.fermentation_volume
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      ...getColumnSearchProps('fermentation_volume'),
    },

    {
      title: 'Fermentation Temperature',
      dataIndex: 'fermentation_temperature',
      key: 'fermentationTemperature',
      width: colWidth,

      onFilter: (value, record) =>
        record.fermentation_temperature
          ? record.fermentation_temperature
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      ...getColumnSearchProps('fermentation_temperature'),
    },
    {
      title: 'Experiment Class',
      dataIndex: 'experiment_class',
      key: 'experimentalClass',
      width: colWidth,

      onFilter: (value, record) =>
        record.experiment_class.name
          ? record.experiment_class.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      ...getColumnSearchProps('experiment_class'),
      render: record => (record ? record.name : null),
    },
    {
      title: 'Culture Medium',
      dataIndex: 'culture_medium',
      key: 'cultureMedium',
      width: colWidth,

      onFilter: (value, record) =>
        record.culture_medium.name
          ? record.culture_medium.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      render: record => (record ? record.name : null),
      ...getColumnSearchProps('culture_medium'),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      width: colWidth,

      onFilter: (value, record) =>
        record.comments
          ? record.comments
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : false,
      ...getColumnSearchProps('comments'),
    },

    // {
    //   title: 'Study ID',
    //   dataIndex: 'study_id',
    //   key: 'studyId',
    // },
    // {
    //   title: 'Fermentation Time',
    //   dataIndex: 'fermentation_time',
    //   key: 'fermentationTime',
    // },
    // {
    //   title: 'Replicons',
    //   dataIndex: 'replicons',
    //   key: 'replicons',
    // },
    // {
    //   title: 'Agitation',
    //   dataIndex: 'agitation',
    //   key: 'agitation',
    // },
  ];

  /* Modal for Uploading Extract */
  const [showExtractForm, setShowExtractForm] = useState(false);
  const [selectedCultureId, setSelectedCultureId] = useState();
  const [selectedOrganizationId, setOrganizationId] = useState();

  if (props.permissions.includes('create:extract')) {
    /* Add Create Extract Column */
    columns.push({
      title: 'Add Extract',
      key: 'create-extract',
      width: colWidth,
      render: record => (
        <Button
          onClick={() => {
            setShowExtractForm(true);
            setSelectedCultureId(record.culture_id);
            setOrganizationId(record.organization_id);
            return undefined;
          }}
          type="primary"
        >
          <CloudUploadOutlined />
        </Button>
      ),
    });
  }

  const expandedRowRender = record => (
    <ExtractTable
      extract={record.extract}
      culture_id={record.culture_id}
      tax={props.tax}
    />
  );
  return (
    <>
      <ExtractFormWithSubmission
        showExtractForm={showExtractForm}
        cultureId={selectedCultureId}
        organizationId={selectedOrganizationId}
        extractionMethods={props.extractionMethods}
        extractionSolvents={props.extractionSolvents}
        permissions={props.permissions}
        setShowExtractForm={setShowExtractForm}
      />
      <Table
        className="components-table-nested"
        rowKey="culture_id"
        dataSource={props.culture.map((culture, idx) =>
          Object.assign({}, culture, { key: idx }),
        )}
        columns={columns}
        expandable={{ expandedRowRender }}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
}

CultureExtractTable.propTypes = {
  culture: PropTypes.array,
  permissions: PropTypes.array,
  extractionSolvents: PropTypes.array,
  extractionMethods: PropTypes.array,
  tax: PropTypes.object,
};

export default memo(CultureExtractTable);
