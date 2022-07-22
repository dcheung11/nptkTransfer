import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  DatePicker,
  AutoComplete,
  InputNumber,
  Space,
  Descriptions,
  Spin,
  Typography,
} from 'antd';
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from '@ant-design/icons';

function ExtractForm(props) {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  /* Labelling of Objects */
  const [extractSolventLabel, setExtractSolventLabel] = useState(undefined);
  const onSelectExtractSolvent = (value, option) => {
    props.setExtractSolvent(option);
    setExtractSolventLabel(value);
  };
  const onChangeExtractSolvent = label => {
    setExtractSolventLabel(label);
    if (label !== props.extractSolvent.label) {
      props.setExtractSolvent({
        label,
      });
    }
  };

  const [extractMethodLabel, setExtractMethodLabel] = useState(undefined);
  const onSelectExtractMethod = (value, option) => {
    props.setExtractMethod(option);
    setExtractMethodLabel(value);
  };
  const onChangeExtractMethod = label => {
    setExtractMethodLabel(label);
    if (label !== props.extractMethod.label) {
      props.setExtractMethod({
        label,
      });
    }
  };

  return (
    <Form
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Descriptions bordered>
        <Form.Item span={1} label="Culture ID">
          <Input disabled value={props.cultureId} />
        </Form.Item>
        <Form.Item
          span={2}
          label={
            <Space>
              {props.extractionDate ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
              )}{' '}
              Extraction Date
            </Space>
          }
          name="extraction-date"
        >
          <DatePicker
            placeholder="2006-06-25"
            value={props.extractionDate}
            stye={{ width: '100%' }}
            onChange={date => props.setExtractDate(date)}
          />
        </Form.Item>
        <Form.Item
          span={3}
          name="extraction-method"
          label={
            <Space>
              {props.extractMethod ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <WarningTwoTone twoToneColor="#fee227" />
              )}{' '}
              Extraction Method
            </Space>
          }
        >
          <AutoComplete
            allowClear
            filterOption
            style={{ width: '100%' }}
            notFoundContent={
              props.createExtractionMethodLoading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                <Typography.Link
                  onClick={() =>
                    props.createExtractionMethod(extractMethodLabel)
                  }
                >
                  Not Found! Add Extraction Method?
                </Typography.Link>
              )
            }
            value={extractMethodLabel}
            onSelect={onSelectExtractMethod}
            onChange={onChangeExtractMethod}
            options={props.extractionMethods
              .map(x => ({
                label: x.name,
                value: x.name,
                key: x.extract_extraction_method_id,
                ...x,
              }))
              .filter(x => !!x.value)
              .sort((x, y) =>
                x.value.toUpperCase() > y.value.toUpperCase() ? 1 : -1,
              )}
          />
        </Form.Item>
        <Form.Item
          span={3}
          label={
            <Space>
              {props.extractVolume ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <WarningTwoTone twoToneColor="#fee227" />
              )}{' '}
              Solvent Volume{' '}
            </Space>
          }
          name="solvent-volume"
        >
          <InputNumber
            defaultValue={0}
            value={props.extractVolume}
            min="0"
            step="0.1"
            onChange={props.setExtractVolume}
          />{' '}
          mL
        </Form.Item>
        <Form.Item
          span={3}
          name="extraction-solvent"
          label={
            <Space>
              {props.extractSolvent ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <WarningTwoTone twoToneColor="#fee227" />
              )}{' '}
              Extraction Solvent
            </Space>
          }
        >
          <AutoComplete
            allowClear
            filterOption
            style={{ width: '100%' }}
            notFoundContent={
              props.createExtractionSolventLoading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              ) : (
                <Typography.Link
                  onClick={() =>
                    props.createExtractionSolvent(extractSolventLabel)
                  }
                >
                  Not Found! Add Extraction Solvent?
                </Typography.Link>
              )
            }
            value={extractSolventLabel}
            onSelect={onSelectExtractSolvent}
            onChange={onChangeExtractSolvent}
            options={props.extractionSolvents
              .map(x => ({
                label: x.name,
                value: x.name,
                key: x.extract_extraction_solvent_id,
                ...x,
              }))
              .sort((x, y) =>
                x.value.toUpperCase() > y.value.toUpperCase() ? 1 : -1,
              )}
          />
        </Form.Item>
        <Form.Item
          span={3}
          name="comments"
          label={
            <Space>
              {props.comments ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <WarningTwoTone twoToneColor="#fee227" />
              )}{' '}
              Comments
            </Space>
          }
        >
          <Input.TextArea
            onChange={e => props.setComments(e.target.defaultValue)}
          />
        </Form.Item>
      </Descriptions>
    </Form>
  );
}

ExtractForm.propTypes = {
  cultureId: PropTypes.number,
  extractionMethods: PropTypes.array,
  extractionSolvents: PropTypes.array,
  extractionDate: PropTypes.object,
  setExtractDate: PropTypes.func,
  extractSolvent: PropTypes.object,
  setExtractSolvent: PropTypes.func,
  createExtractionSolventLoading: PropTypes.bool,
  createExtractionSolvent: PropTypes.func,
  extractMethod: PropTypes.object,
  setExtractMethod: PropTypes.func,
  createExtractionMethodLoading: PropTypes.bool,
  createExtractionMethod: PropTypes.func,
  extractVolume: PropTypes.number,
  setExtractVolume: PropTypes.func,
  comments: PropTypes.string,
  setComments: PropTypes.func,
};

export default memo(ExtractForm);
