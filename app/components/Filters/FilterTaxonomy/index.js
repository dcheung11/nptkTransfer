/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from 'react';
import {
  Card,
  Modal,
  Table,
  Form,
  Button,
  Select,
  InputNumber,
  Empty,
  Tabs,
  Checkbox,
} from 'antd';
import PropTypes from 'prop-types';
import { transformData } from '../../TreeLike/TaxTreeMap/transformers';

function FilterTaxonomy(props) {
  // Filter Criteria
  const [reload, setReload] = useState(0);
  const [selected, setSelected] = useState([]);

  const [filteringData, setFilteringData] = useState(props.filteringData);

  // Orderable Strain JSON
  const orderableIds = require('./orderable_taxids_and_genomes.json');
  // Data
  const [rawData, setRawData] = useState(props.rawData);
  const [data, setData] = useState(transformData(props.data));

  // Helper functions

  function areAllChildrenGrey(strainArray) {
    let allGrey = true;
    strainArray.forEach(child => {
      if (child.itemStyle === undefined) {
        allGrey = false;
      }
    });
    return allGrey;
  }

  function recursiveGreyOut(strainArray) {
    const itemStyle = { color: props.nodeColor };

    strainArray.forEach(childObj => {
      // object has children
      if (typeof childObj.children[0].children === 'object') {
        // recursive with children
        recursiveGreyOut(childObj.children);
      }
      // object not have children
      if (areAllChildrenGrey(childObj.children)) {
        childObj.itemStyle = itemStyle;
      }
    });
    return strainArray;
  }

  function filterTaxonomyData(strains, filterCriteria) {
    console.log(filterCriteria);
    let filteredStrains = strains;
    // Change individual nodes to grey them out
    Object.keys(filterCriteria).forEach(key => {
      if (filterCriteria[key] === false) {
        filteredStrains = filteredStrains;
      } else if (key === 'library' && filterCriteria[key] === true) {
        filteredStrains = filteredStrains.filter(strain => {
          let inLibrary = false;
          Object.keys(strain).forEach(tag => {
            if (tag.startsWith('known')) {
              if (strain[tag] > 0) {
                inLibrary = true;
              }
            }
          });
          return inLibrary;
        });
      } else if (key === 'orderable' && filterCriteria[key] === true) {
        filteredStrains = filteredStrains.filter(x =>
          Object.keys(orderableIds).includes(String(x.taxonomy_id)),
        );
      } else {
        filteredStrains = filteredStrains.filter(
          x =>
            x[key] >= filterCriteria[key][0] &&
            x[key] <= filterCriteria[key][1],
        );
      }
    });

    const itemStyle = { color: props.nodeColor };
    for (let j = 0; j < strains.length; j++) {
      if (strains[j].itemStyle !== undefined) {
        delete strains[j].itemStyle;
      }
      if (!filteredStrains.includes(strains[j])) {
        strains[j].itemStyle = itemStyle;
      }
    }
    setReload(reload + 1);
    return strains;
  }

  const handleOk = () => {
    props.setFilteringData(filteringData);
    props.setShowDataFilter(false);
  };

  const handleCancel = () => {
    props.setShowDataFilter(false);
    setFilteringData(props.filteringData);
  };

  const onChange = (value, item, type) => {
    if (type === 'min') {
      if (Object.keys(filteringData).includes(item)) {
        const range = filteringData[item];
        const newRange = [value, range[1]];
        setFilteringData({
          ...filteringData,
          [item]: newRange,
        });
      } else {
        setFilteringData({
          ...filteringData,
          [item]: [value, Infinity],
        });
      }
    } else if (Object.keys(filteringData).includes(item)) {
      const range = filteringData[item];
      const newRange = [range[0], value];
      setFilteringData({
        ...filteringData,
        [item]: newRange,
      });
    } else {
      setFilteringData({
        ...filteringData,
        [item]: [0, value],
      });
    }
  };
  const onChangeDatasets = value => {
    if (!Object.keys(filteringData).includes(value)) {
      setFilteringData({
        ...filteringData,
        [value]: true,
      });
    } else if (filteringData[value] === true) {
      setFilteringData({
        ...filteringData,
        [value]: false,
      });
    } else {
      setFilteringData({
        ...filteringData,
        [value]: true,
      });
    }
  };

  const makeFilteringData = () => {
    const newFilteringData = Object.keys(filteringData)
      .filter(key => selected.includes(key))
      .reduce(
        (obj, key) =>
          Object.assign(obj, {
            [key]: filteringData[key],
          }),
        {},
      );
    setFilteringData(newFilteringData);
  };

  const filterTable = [];
  // lists

  const filteringListA = [
    'known_aminoglycoside',
    'known_antibacterial',
    'known_antifungal',
    'known_antimalarial',
    'known_antitubercular',
    'known_herbicide',
    'known_families',
    'novel_families',
    'metabologenomic_hits',
    'metabolomic_hits',
  ];
  const filteringListPlume = [
    'novel_plume_alkaloid',
    'novel_plume_aminoglycoside',
    'novel_plume_betalactam',
    'novel_plume_hybrid',
    'novel_plume_nis',
    'novel_plume_nrps',
    'novel_plume_nucleoside',
    'novel_plume_ripp',
    'novel_plume_terpene',
    'novel_plume_type1pk',
    'novel_plume_type2pk',
  ];

  const filteringListPear = [
    'novel_pear_hybrid',
    'novel_pear_nrps',
    'novel_pear_type1pk',
    'novel_pear_type2pk',
  ];
  const filteringListKnowns = [
    'known_alkaloid',
    'known_betalactam',
    'known_hybrid',
    'known_nis',
    'known_nrps',
    'known_nucleoside',
    'known_ripp',
    'known_terpene',
    'known_type1pk',
    'known_type2pk',
  ];

  const columns = [
    {
      title: 'Tag',
      dataIndex: 'tag',
    },
    {
      title: 'Min',
      dataIndex: 'min',
    },
    {
      title: 'Max',
      dataIndex: 'max',
    },
  ];

  useEffect(() => {
    makeFilteringData();
  }, [selected]);

  useEffect(() => {
    setRawData(filterTaxonomyData(rawData, props.filteringData));
  }, [props.filteringData, props.nodeColor]);

  useEffect(() => {
    props.setRawData(rawData);
    setData(recursiveGreyOut(transformData(rawData)));
  }, [reload]);

  useEffect(() => {
    props.setData(data);
  }, [data]);

  const resetFilters = () => {
    setFilteringData({});
    setSelected([]);
  };

  const getMin = x => {
    if (typeof filteringData[x] === 'object') {
      return filteringData[x][0];
    }
    return 0;
  };
  return (
    <Modal
      title="Data Filters"
      visible={props.showDataFilter}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Tabs>
        <Tabs.TabPane tab="Activity Profile" key="1">
          {' '}
          <Form layout="vertical">
            <Card bordered>
              <>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  value={selected}
                  onChange={setSelected}
                >
                  <Select.OptGroup label="Hits and Families">
                    {filteringListA.map(item => (
                      <Select.Option key={item}>
                        {item.replace(/_/g, ' ')}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="Plume">
                    {filteringListPlume.map(item => (
                      <Select.Option key={item}>
                        {item.replace(/_/g, ' ')}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="Pear">
                    {filteringListPear.map(item => (
                      <Select.Option key={item}>
                        {item.replace(/_/g, ' ')}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                  <Select.OptGroup label="Knowns">
                    {filteringListKnowns.map(item => (
                      <Select.Option key={item}>
                        {item.replace(/_/g, ' ')}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                </Select>
                <br />
                {Object.keys(selected).length === 0 ? (
                  <Card>
                    <Empty description="No filters selected" />
                  </Card>
                ) : (
                  <>
                    {selected.map(item => (
                      <>
                        {filterTable.push({
                          key: item,
                          tag: item.replace(/_/g, ' '),
                          min: (
                            <InputNumber
                              min={0}
                              defaultValue={0}
                              onChange={value => onChange(value, item, 'min')}
                            />
                          ),
                          max: (
                            <InputNumber
                              min={getMin(item)}
                              defaultValue={Infinity}
                              onChange={value => onChange(value, item, 'max')}
                            />
                          ),
                        })}
                      </>
                    ))}
                    <Table
                      pagination={false}
                      columns={columns}
                      dataSource={filterTable}
                    />
                  </>
                )}
              </>
            </Card>

            <Form.Item label=" " colon={false}>
              <Button type="primary" danger onClick={resetFilters}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dataset" key="2">
          <Form>
            <Card bordered>
              <Checkbox.Group>
                <Checkbox
                  onChange={e => onChangeDatasets(e.target.value)}
                  value="library"
                >
                  Is in Library
                </Checkbox>
                <Checkbox
                  onChange={e => onChangeDatasets(e.target.value)}
                  value="orderable"
                >
                  Is an Orderable Strain
                </Checkbox>
              </Checkbox.Group>
            </Card>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

FilterTaxonomy.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  rawData: PropTypes.array,
  setRawData: PropTypes.func,
  showDataFilter: PropTypes.bool,
  setShowDataFilter: PropTypes.func,
};

export default memo(FilterTaxonomy);
