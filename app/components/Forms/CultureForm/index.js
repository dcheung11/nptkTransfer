import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Form,
  Input,
  InputNumber,
  Descriptions,
  DatePicker,
  AutoComplete,
  Typography,
  Spin,
} from 'antd';

import {
  LoadingOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';

function CultureForm(props) {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [organizationLabel, setOrganizationLabel] = useState(undefined);
  const onSelectOrganization = (value, option) => {
    props.setOrganization(option);
    setOrganizationLabel(value);
  };
  const onChangeOrganization = label => {
    setOrganizationLabel(label);
    if (label !== props.organization.label) {
      props.setOrganization({ label });
    }
  };

  const [culturalMediumLabel, setCulturalMediumLabel] = useState(undefined);
  const onSelectCulturalMedium = (value, option) => {
    props.setCulturalMedium(option);
    setCulturalMediumLabel(value);
  };
  const onChangeCulturalMedium = label => {
    setCulturalMediumLabel(label);
    if (label !== props.culturalMedium.label) {
      props.setCulturalMedium({
        label,
      });
    }
  };

  const [experimentalClassLabel, setExperimentalClassLabel] = useState(
    undefined,
  );
  const onSelectExperimentalClass = (value, option) => {
    props.setExperimentalClass(option);
    setExperimentalClassLabel(value);
  };

  const onChangeExperimentalClass = label => {
    setExperimentalClassLabel(label);
    if (label !== props.experimentalClass.label) {
      props.setExperimentalClass({ label });
    }
  };

  return (
    <Space>
      <Form
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Descriptions bordered>
          <Form.Item
            required
            label={
              <Space>
                {props.taxonomyId ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Strain ID
              </Space>
            }
            name="strain"
          >
            <Input defaultValue={props.taxonomyId} disabled />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                {props.inoculationDate ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Inoculation Date
              </Space>
            }
            name="inoculation-date"
          >
            <DatePicker
              placeholder="eg. 2006-06-25"
              value={props.inoculationDate}
              onChange={date => props.setInoculationDate(date)}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                {props.researcher.username ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="eb2f96" />
                )}{' '}
                Researcher
              </Space>
            }
            name="researcher"
          >
            <Input
              placeholder="eg. Keshav"
              defaultValue={props.researcher.username}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="organization"
            label={
              <Space>
                {props.organization.organization_id ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <WarningTwoTone twoToneColor="#fee227" />
                )}{' '}
                Organization
              </Space>
            }
          >
            <AutoComplete
              allowClear
              filterOption
              value={organizationLabel}
              style={{ width: '100%' }}
              onSelect={onSelectOrganization}
              onChange={onChangeOrganization}
              notFoundContent={
                props.createOrganizationLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <Typography.Link
                    onClick={() => props.createOrganization(organizationLabel)}
                  >
                    Not Found! Add Organization?
                  </Typography.Link>
                )
              }
              options={props.organizationIds
                .map(x => ({
                  label: x.name,
                  value: x.name,
                  key: x.organization_id,
                  ...x,
                }))
                .sort((x, y) =>
                  x.value.toUpperCase() > y.value.toUpperCase() ? 1 : -1,
                )}
            />
          </Form.Item>
          <Form.Item
            name="experimental-class"
            label={
              <Space>
                {props.experimentalClass.experiment_class_id ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <WarningTwoTone twoToneColor="#fee227" />
                )}{' '}
                Experimental Class
              </Space>
            }
            span={3}
          >
            <AutoComplete
              allowClear
              filterOption
              value={experimentalClassLabel}
              onSelect={onSelectExperimentalClass}
              onChange={onChangeExperimentalClass}
              style={{ width: '100%' }}
              notFoundContent={
                props.createExperimentalClassLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <Typography.Link
                    onClick={() =>
                      props.createExperimentalClass(experimentalClassLabel)
                    }
                  >
                    Not Found! Add Add Experimental Class?
                  </Typography.Link>
                )
              }
              options={props.experimentalClasses
                .map(x => ({
                  label: x.name,
                  value: x.name,
                  key: x.experiment_class_id,
                  ...x,
                }))
                .sort((x, y) =>
                  x.value.toUpperCase() > y.value.toUpperCase() ? 1 : -1,
                )}
            />
          </Form.Item>
          <Form.Item
            label={
              <Space>
                {props.fermentationVolume ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <WarningTwoTone twoToneColor="#fee227" />
                )}{' '}
                Fermentation Volume{' '}
              </Space>
            }
            name="fermentation-volume"
          >
            <InputNumber
              defaultValue={props.fermentationVolume}
              min="0"
              step="0.1"
              onChange={props.setFermentationVolume}
            />{' '}
            mL
          </Form.Item>
          <Form.Item
            name="fermentation-temperature"
            label={
              <Space>
                {props.fermentationTemperature ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <WarningTwoTone twoToneColor="#fee227" />
                )}{' '}
                Fermentation Temperature
              </Space>
            }
          >
            <InputNumber
              defaultValue={0}
              value={props.fermentationTemperature}
              min="0"
              step="0.1"
              onChange={props.setFermentationTemperature}
            />{' '}
            °C
          </Form.Item>
          <Form.Item
            label={
              <Space>
                {props.replicons ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <WarningTwoTone twoToneColor="#fee227" />
                )}{' '}
                Number of Replicons
              </Space>
            }
            name="number-replicons"
          >
            <InputNumber
              defaultValue={0}
              min="0"
              step="1"
              value={props.replicons}
              onChange={props.setReplicons}
            />
          </Form.Item>
          <Form.Item
            span={3}
            name="Media Type"
            label={
              <Space>
                {props.culturalMedium.culture_medium_id ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
                )}{' '}
                Media Type
              </Space>
            }
          >
            <AutoComplete
              allowClear
              filterOption
              onSelect={onSelectCulturalMedium}
              onChange={onChangeCulturalMedium}
              value={culturalMediumLabel}
              notFoundContent={
                props.createCulturalMediumLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  <Typography.Link
                    onClick={() =>
                      props.createCulturalMedium(culturalMediumLabel)
                    }
                  >
                    Not Found! Add Culture Medium?
                  </Typography.Link>
                )
              }
              style={{ width: '100%' }}
              options={props.cultureMedia
                .map(x => ({
                  label: x.name,
                  value: x.name,
                  key: x.culture_medium_id,
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
    </Space>
  );
}

CultureForm.propTypes = {
  taxonomyId: PropTypes.string,
  organizationIds: PropTypes.array,
  organization: PropTypes.object,
  setOrganization: PropTypes.func,
  createOrganization: PropTypes.func,
  createOrganizationLoading: PropTypes.bool,
  experimentalClasses: PropTypes.array,
  experimentalClass: PropTypes.object,
  setExperimentalClass: PropTypes.func,
  comments: PropTypes.string,
  createExperimentalClass: PropTypes.func,
  createExperimentalClassLoading: PropTypes.bool,
  cultureMedia: PropTypes.array,
  culturalMedium: PropTypes.object,
  setCulturalMedium: PropTypes.func,
  createCulturalMedium: PropTypes.func,
  createCulturalMediumLoading: PropTypes.bool,
  inoculationDate: PropTypes.object,
  setInoculationDate: PropTypes.func,
  researcher: PropTypes.string,
  setComments: PropTypes.func,
  setReplicons: PropTypes.func,
  replicons: PropTypes.number,
  setFermentationVolume: PropTypes.func,
  fermentationVolume: PropTypes.number,
  setFermentationTemperature: PropTypes.func,
  fermentationTemperature: PropTypes.number,
};

export default memo(CultureForm);
