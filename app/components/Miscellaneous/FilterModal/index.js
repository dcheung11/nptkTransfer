import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Modal,
  Slider,
  Typography,
  Radio,
  Space,
  Alert,
  Checkbox,
  Col,
  Row,
  InputNumber,
  Button,
} from 'antd';
import TagActivity, { metaMap } from '../../Tags/TagActivity';

const { Title } = Typography;

function FilterModal(props) {
  /* Local States in case user presses cancel */
  const [validation, setValidation] = useState(props.validation);
  const [minimumMemberSize, setMinimumMemberSize] = useState(
    props.minimumMemberSize,
  );
  const [minimumNovelDerivatives, setMinimumNovelDerivatives] = useState(
    props.minimumNovelDerivatives,
  );
  const [mandatoryActivities, setMandatoryActivities] = useState(
    props.mandatoryActivities,
  );
  const [minimumTaxonomyLevel, setMinimumTaxonomyLevel] = useState(
    props.minimumTaxonomyLevel,
  );
  const [genomicConfidence, setGenomicConfidence] = useState(
    props.genomicConfidence,
  );
  const [metabolomicConfidence, setMetabolomicConfidence] = useState(
    props.metabolomicConfidence,
  );

  const handleOk = () => {
    props.setIsModalVisible(false);
    props.setValidation(validation);
    props.setMinimumMemberSize(minimumMemberSize);
    props.setMinimumNovelDerivatives(minimumNovelDerivatives);
    props.setMandatoryActivities(mandatoryActivities);
    props.setMinimumTaxonomyLevel(minimumTaxonomyLevel);
    props.setGenomicConfidence(genomicConfidence);
    props.setMetabolomicConfidence(metabolomicConfidence);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setValidation(props.validation);
    setMinimumMemberSize(props.minimumMemberSize);
    setMinimumNovelDerivatives(props.minimumNovelDerivatives);
    setMandatoryActivities(props.mandatoryActivities);
    setMinimumTaxonomyLevel(props.minimumTaxonomyLevel);
    setGenomicConfidence(props.genomicConfidence);
    setMetabolomicConfidence(props.metabolomicConfidence);
  };

  const taxonomyLevels = {
    0: 'Kingdom',
    1: 'Phylum',
    2: 'Class',
    3: 'Order',
    4: 'Family',
    5: 'Genus',
  };

  const percentageMarks = {
    0: { label: '0%' },
    20: { label: '20%' },
    40: { label: '40%' },
    60: { label: '60%' },
    80: { label: '80%' },
    100: { label: '100%' },
  };

  return (
    <Modal
      title="Predicted Molecule Filters"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <Alert
          message="Informational Notes"
          description="Set your filtering criteria here."
          type="info"
          showIcon
        />
        <Card bordered={false}>
          <Title level={5}>Analog Group Validation</Title>
          <Radio.Group
            name="radiogroup"
            defaultValue={validation}
            value={validation}
            onChange={e => setValidation(e.target.value)}
          >
            <Space direction="vertical">
              <Radio value={1}>Any</Radio>
              <Radio value={2}>Encoded</Radio>
              <Radio value={3}>Expressed</Radio>
              <Radio value={4}>Encoded & Expressed</Radio>
            </Space>
          </Radio.Group>
        </Card>
        <Card bordered={false}>
          <Title level={5}>Minimum Member Size</Title>
          <Space>
            <InputNumber
              min={0}
              max={Infinity}
              value={minimumMemberSize}
              onChange={setMinimumMemberSize}
            />
            <Button
              type="primary"
              onClick={() => setMinimumMemberSize(props.minimumMemberSize)}
            >
              Reset
            </Button>
          </Space>
        </Card>
        <Card bordered={false}>
          <Title level={5}>Minimum Novel Derivatives</Title>
          <Space>
            <InputNumber
              min={0}
              max={Infinity}
              value={minimumNovelDerivatives}
              onChange={setMinimumNovelDerivatives}
            />
            <Button
              type="primary"
              onClick={() =>
                setMinimumNovelDerivatives(props.minimumNovelDerivatives)
              }
            >
              Reset
            </Button>
          </Space>
        </Card>
        <Card bordered={false}>
          <Title level={5}>Mandatory Activites:</Title>
          <Checkbox.Group
            onChange={setMandatoryActivities}
            defaultValue={mandatoryActivities}
            value={mandatoryActivities}
          >
            <Row>
              {Object.keys(metaMap).map(x => (
                <Col key={x} span={10}>
                  <Checkbox value={x}>
                    <TagActivity activity={x} />
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Card>
        <Card bordered={false}>
          <Title level={5}>Taxonomic Level</Title>
          <Slider
            id="taxonomy-slider"
            step={null}
            marks={taxonomyLevels}
            max={5}
            tipFormatter={value => value}
            defaultValue={minimumTaxonomyLevel}
            value={minimumTaxonomyLevel}
            onChange={setMinimumTaxonomyLevel}
          />
        </Card>
        <Card bordered={false}>
          <Title level={5}>Genomic Confidence</Title>
          <Slider
            id="genomic-slider"
            defaultValue={genomicConfidence}
            value={genomicConfidence}
            onChange={setGenomicConfidence}
            tipFormatter={value => `${value}%`}
            marks={percentageMarks}
          />
        </Card>
        <Card bordered={false}>
          <Title level={5}>Metabolomic Confidence</Title>
          <Slider
            id="metabolomic-slider"
            defaultValue={metabolomicConfidence}
            value={metabolomicConfidence}
            onChange={setMetabolomicConfidence}
            tipFormatter={value => `${value}%`}
            marks={percentageMarks}
          />
        </Card>
      </div>
    </Modal>
  );
}

FilterModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  validation: PropTypes.number,
  setValidation: PropTypes.func,
  mandatoryActivities: PropTypes.array,
  setMandatoryActivities: PropTypes.func,
  minimumMemberSize: PropTypes.number,
  setMinimumMemberSize: PropTypes.func,
  minimumNovelDerivatives: PropTypes.number,
  setMinimumNovelDerivatives: PropTypes.func,
  minimumTaxonomyLevel: PropTypes.number,
  setMinimumTaxonomyLevel: PropTypes.func,
  genomicConfidence: PropTypes.number,
  setGenomicConfidence: PropTypes.func,
  metabolomicConfidence: PropTypes.number,
  setMetabolomicConfidence: PropTypes.func,
};

export default memo(FilterModal);
