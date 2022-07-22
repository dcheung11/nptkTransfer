import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button, Col, Row, Empty } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import analogSaga from '../../data/cactus/analog/sagas';
import analogReducer from '../../data/cactus/analog/reducers';
import AnalogChemotypeTabPane from '../../components/Metadata/AnalogChemotypeTabPane';
import { capitalizeFirstLetter } from '../../utils/texthelper';
import FilterModal from '../../components/Miscellaneous/FilterModal';

const { TabPane } = Tabs;

function AnalogChemotypeTabs(props) {
  useInjectSaga({ key: 'analog', saga: analogSaga });
  useInjectReducer({ key: 'analog', reducer: analogReducer });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validation, setValidation] = useState(1);
  const [minimumMemberSize, setMinimumMemberSize] = useState(0);
  const [minimumNovelDerivatives, setMinimumNovelDerivatives] = useState(0);
  const [mandatoryActivities, setMandatoryActivities] = useState([]);
  const [minimumTaxonomyLevel, setMinimumTaxonomyLevel] = useState(0);
  const [genomicConfidence, setGenomicConfidence] = useState(undefined);
  const [metabolomicConfidence, setMetabolomicConfidence] = useState(undefined);
  const validationLookup = {
    1: ['metabolomic', 'genomic', 'metabologenmic'],
    2: ['genomic'],
    3: ['metabolomic'],
    4: ['metabologenmic'],
  };
  const filteredMetabologenomicHits = props.metabologenomicHits
    // Validation Filter
    .filter(x => validationLookup[validation].includes(x.analog_validation))
    // Member Size Filter
    .filter(x => x.analog_count >= minimumMemberSize)
    // Novel Analog Size Filter
    .filter(x => x.novel_analog_count >= minimumNovelDerivatives)
    // Mandatory Activities Filter
    .filter(x => {
      const thisActivity = new Set(x.activity_profile);
      return (
        mandatoryActivities.filter(y => thisActivity.has(y)).length ===
        mandatoryActivities.length
      );
    })
    // Minimum Taxonomy Level Filter
    .filter(x => x.best_tax_score >= minimumTaxonomyLevel)
    // Genomic Confidence
    .filter(x =>
      genomicConfidence && genomicConfidence > 0
        ? x.best_quince_score * 100 >= genomicConfidence
        : true,
    )
    // Metabomolic Confidence
    .filter(x =>
      metabolomicConfidence && metabolomicConfidence > 0
        ? x.best_smcaller_score * 100 >= metabolomicConfidence
        : true,
    );

  const groupedChemotypes = filteredMetabologenomicHits.reduce(
    (lookup, hit) => {
      // eslint-disable-next-line no-param-reassign
      lookup[hit.chemotype] = lookup[hit.chemotype] || [];
      lookup[hit.chemotype].push(hit);
      return lookup;
    },
    Object.create(null),
  );
  const tabs = Object.keys(groupedChemotypes).map(x => (
    <TabPane tab={capitalizeFirstLetter(x)} key={x}>
      <AnalogChemotypeTabPane chemotype={x} hits={groupedChemotypes[x]} />
    </TabPane>
  ));

  return (
    <div>
      <Row>
        <Col span={2}>
          <Button
            type="primary"
            icon={<ControlOutlined />}
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Filters
          </Button>
        </Col>
        <Col span={10} offset={10} />
      </Row>
      <FilterModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        validation={validation}
        setValidation={setValidation}
        minimumMemberSize={minimumMemberSize}
        setMinimumMemberSize={setMinimumMemberSize}
        minimumNovelDerivatives={minimumNovelDerivatives}
        setMinimumNovelDerivatives={setMinimumNovelDerivatives}
        mandatoryActivities={mandatoryActivities}
        setMandatoryActivities={setMandatoryActivities}
        minimumTaxonomyLevel={minimumTaxonomyLevel}
        setMinimumTaxonomyLevel={setMinimumTaxonomyLevel}
        genomicConfidence={genomicConfidence}
        setGenomicConfidence={setGenomicConfidence}
        metabolomicConfidence={metabolomicConfidence}
        setMetabolomicConfidence={setMetabolomicConfidence}
      />
      {filteredMetabologenomicHits.length > 0 ? (
        <Tabs centered="true">{tabs}</Tabs>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

AnalogChemotypeTabs.propTypes = {
  metabologenomicHits: PropTypes.array,
};

export default memo(AnalogChemotypeTabs);
