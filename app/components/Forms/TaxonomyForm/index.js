/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-duplicates */
import React, { memo, useState } from 'react';
import { Space, Form, Input, Descriptions, Select } from 'antd';
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

function TaxonomyForm(props) {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;
  const onChangeParentTaxonomyId = e => {
    props.setParentTaxonomyId(e.target.value);
  };

  const onSelectRank = (value, option) => {
    props.setRank(value);
  };
  const onChangeName = e => {
    props.setName(e.target.value);
  };

  return (
    <Space>
      <Form
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Descriptions bordered>
          <Form.Item
            span={3}
            name="parent-taxonomy-id"
            label={
              <Space>
                {props.parentTaxonomyId ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Parent Taxonomy ID
              </Space>
            }
            rules={[
              {
                required: true,
                message: 'Please input the parent taxonomy ID',
              },
            ]}
            value={props.parentTaxonomyId}
          >
            <Input onChange={onChangeParentTaxonomyId} />
            {/* <Input onChange= {e => setParentTaxonomyId(e.target.value)} /> */}
          </Form.Item>

          <Form.Item
            value={props.rank}
            label={
              <Space>
                {props.rank ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Rank
              </Space>
            }
            rules={[{ required: true, message: 'Please select a rank' }]}
            span={3}
          >
            <Select placeholder="Select" onSelect={onSelectRank} allowClear>
              <Option value="strain">Strain</Option>
              <Option value="species">Species</Option>
            </Select>
          </Form.Item>

          <Form.Item
            span={3}
            name="name"
            label={
              <Space>
                {props.name ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Name
              </Space>
            }
            value={props.name}
            rules={[{ required: true, message: 'Please input the name' }]}
            required
          >
            <Input onChange={onChangeName} />
            {/* <Input onChange={e => setName(e.target.value)} /> */}
          </Form.Item>
        </Descriptions>
      </Form>
    </Space>
  );
}

export default memo(TaxonomyForm);
