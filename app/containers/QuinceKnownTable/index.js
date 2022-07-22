import React, { memo, useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import knownClusterReducer from '../../data/cactus/known_cluster/reducers';
import knownClusterSaga from '../../data/cactus/known_cluster/sagas';
import { fetchAllKnown } from '../../data/cactus/known_cluster/actions';
import {
  makeSelectAllKnownLoading,
  makeSelectAllKnown,
} from '../../data/cactus/known_cluster/selectors';
import QuinceKnownDiv from '../../components/Layouts/Quince/QuinceKnownDiv';
import MoleculeWithModal from '../../components/Chemistry/MoleculeWithModal';
import ChemotypeTag from '../../components/Tags/TagChemotype';
import { capitalizeFirstLetter } from '../../utils/texthelper';

function QuinceKnownTable(props) {
  useInjectReducer({ key: 'known_cluster', reducer: knownClusterReducer });
  useInjectSaga({ key: 'known_cluster', saga: knownClusterSaga });

  /*
  Fetch Data
  */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllKnown({ bearerToken: localStorage.token }));
  }, []);

  /*
  Make Selectors
  */

  const selectAllKnownLoading = makeSelectAllKnownLoading();
  const allKnownLoading = useSelector(selectAllKnownLoading);

  const selectAllKnown = makeSelectAllKnown();
  const allKnown = useSelector(selectAllKnown);
  const annotatedClusters = allKnown.map(x => ({
    ...x,
    key: x.cluster_id,
  }));

  /*
  Setup for Known BGC Table
  */

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

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
  });

  const columns = [
    {
      title: 'Cluster ID',
      dataIndex: 'cluster_id',
      key: 'cluster_id',
      width: '20%',
      onFilter: (value, record) =>
        record.cluster_id
          ? record.cluster_id.toString().includes(value)
          : false,
      render: text =>
        searchedColumn === 'cluster_id' ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
      ...getColumnSearchProps('cluster_id'),
    },
    {
      title: 'Chemotype',
      dataIndex: 'predicted_families',
      key: 'predicted_families',
      width: '20%',
      onFilter: (value, record) =>
        record.predicted_families
          ? record.predicted_families
            .join(' ')
            .replace('_', ' ')
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      render: chemoType =>
        searchedColumn === 'predicted_families'
          ? chemoType.map((fam, idx) => (
            <ChemotypeTag
              key={idx}
              family={fam}
              highlight={
                searchText.length > 0 &&
                  fam.toLowerCase().includes(searchText.toLowerCase())
              }
            />
          ))
          : chemoType.map((fam, idx) => (
              <ChemotypeTag key={idx} family={fam} />
            )),
      ...getColumnSearchProps('predicted_families'),
    },
    {
      title: 'Names',
      dataIndex: 'smallmolecule',
      key: 'smallmolecule',
      width: '40%',
      onFilter: (value, record) =>
        record.smallmolecule.names
          ? record.smallmolecule.names
            .join(' ')
            .replace('_', ' ')
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : false,
      render: node =>
        searchedColumn === 'smallmolecule' ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
          >
            {node.names.map(capitalizeFirstLetter).join(', ')}
          </Highlighter>
        ) : (
          node.names.map(capitalizeFirstLetter).join(', ')
        ),

      ...getColumnSearchProps('smallmolecule_names'),
    },
    {
      title: 'Preview',
      dataIndex: 'smallmolecule',
      key: 'smiles',
      width: '30%',
      render: node => (
        <MoleculeWithModal
          smilesValue={node.original_smiles}
          uuid={node.smallmolecule_id}
          drawingHeight={50}
          drawingWidth={100}
        />
      ),
    },
  ];
  return <QuinceKnownDiv columns={columns} data={annotatedClusters || []} />;
}

QuinceKnownTable.propTypes = {
  history: PropTypes.object,
};

export default memo(QuinceKnownTable);
