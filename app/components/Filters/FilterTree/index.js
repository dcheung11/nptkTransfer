/* eslint-disable react/no-unescaped-entities */
import React, { memo, useState } from 'react';
import { Card, Checkbox, Modal, Select, Slider } from 'antd';
import { PropTypes } from 'prop-types';

function FilterTree(props) {
  /* Local States in case user presses cancel */
  const [depth, setDepth] = useState(props.depth);
  const [showLabel, setShowLabel] = useState(false);
  // const [filterMethod, setFilterMethod] = useState(1);
  const [nodeColor, setNodeColor] = useState('grey');
  const [theme, setTheme] = useState('');

  const handleOk = () => {
    props.setShowVisualFilter(false);
    // setShowLabel()
    // setDepth(value);
    props.setDepth(depth);
    props.setShowLabel(showLabel);
    props.setNodeColor(nodeColor);
    props.setTheme(theme);

    // props.setFilterMethod(filterMethod);
  };

  const handleCancel = () => {
    props.setShowVisualFilter(false);
    setDepth(props.depth);
    setShowLabel(props.showLabel);
    setNodeColor(props.nodeColor);
    setTheme(props.theme);

    // setFilterMethod(props.filterMethod);
  };

  const onChangeDepth = value => {
    setDepth(value);
  };

  const onChangeLabel = checked => {
    setShowLabel(checked.target.checked);
  };

  const onColorChange = checked => {
    // setFilterMethod()
    setNodeColor(checked);
  };

  const onThemeChange = value => {
    // setFilterMethod()
    setTheme(value);
  };
  const { Option } = Select;

  const disabled = props.option === 'sunburst';
  return (
    <Modal
      title="Activity Profile Filters"
      visible={props.showVisualFilter}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <Card bordered>
          <>
            Tree Depth
            <Slider
              disabled={disabled}
              label="depth"
              defaultValue={1}
              min={1}
              max={8}
              onChange={onChangeDepth}
            />
            <br />
            Show Upper Label:
            <Checkbox
              value="true"
              onChange={onChangeLabel}
              valuePropName="checked"
            />
            <br />
            <br />
            Select "Not In Data" Colour: {'  '}
            <Select
              defaultValue="grey"
              style={{ width: 120 }}
              onChange={onColorChange}
            >
              <Option value="black">black</Option>
              <Option value="grey">grey</Option>
              <Option value="red">red</Option>
              <Option value="white">white</Option>
            </Select>
            <br />
            <br />
            Select Theme: {'  '}
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={onThemeChange}
            >
              <Option value="">default</Option>
              <Option value="dark">dark</Option>
              <Option value="infographic">infographic</Option>
              <Option value="macarons">macarons</Option>
              <Option value="roma">roma</Option>
              <Option value="shine">shine</Option>
              <Option value="vintage">vintage</Option>
            </Select>
            <br />
          </>
        </Card>
      </div>
    </Modal>
  );
}

FilterTree.propTypes = {
  depth: PropTypes.number,
  setDepth: PropTypes.func,
  showVisualFilter: PropTypes.bool,
  setShowVisualFilter: PropTypes.func,
  showLabel: PropTypes.bool,
  setShowLabel: PropTypes.func,
  theme: PropTypes.string,
  setTheme: PropTypes.func,
  nodeColor: PropTypes.string,
  setNodeColor: PropTypes.func,
  option: PropTypes.string,
};

export default memo(FilterTree);
