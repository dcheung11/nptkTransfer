import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Typography, Checkbox, Col, Row, Radio } from 'antd';
import TagActivity, { metaMap } from '../../Tags/TagActivity';

const { Title } = Typography;

function FilterMicroWellPlate(props) {
  /* Local States in case user presses cancel */
  const [activityProfiles, setActivityProfiles] = useState(
    props.activityProfiles,
  );
  /* Check All Functionality
   *  If a user unchecks all of the filters then, show all wells by default
   */
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
  const onCheckAllChange = e => {
    setActivityProfiles(e.target.checked ? Object.keys(metaMap) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleOk = () => {
    props.setIsModalVisible(false);
    props.setActivityProfiles(activityProfiles);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setActivityProfiles(props.activityProfiles);
  };
  /* Generate Bioassay filters */

  const radioGroups = Object.entries(props.assayKeys).map(
    ([bioassayName, bioassayKeys]) => {
      const theseRadioButtons = [];
      bioassayKeys.forEach(bioassayKey =>
        theseRadioButtons.push(
          <Radio value={bioassayKey}>{bioassayKey}</Radio>,
        ),
      );
      theseRadioButtons.push(<Radio value="default">Default</Radio>);
      return (
        <div>
          <Title level={5}>Available Bioassay: {bioassayName}</Title>
          <Radio.Group
            onChange={x => {
              props.setSelectedShadingKey(x.target.value);
              props.setSelectedBioAssay(bioassayName);
            }}
            value={props.selectedShadingKey}
          >
            {theseRadioButtons}
          </Radio.Group>
        </div>
      );
    },
  );

  return (
    <Modal
      title="Activity Profile Filters"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <Card bordered={false}>
          <Title level={5}>Activities:</Title>
          <Checkbox.Group
            onChange={setActivityProfiles}
            defaultValue={activityProfiles}
            value={activityProfiles}
          >
            <Row>
              {Object.keys(metaMap).map(x => (
                <Col span={10} key={x}>
                  <Checkbox value={x}>
                    <TagActivity activity={x} />
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </Card>
        <Card bordered={false}>{radioGroups}</Card>
      </div>
    </Modal>
  );
}

FilterMicroWellPlate.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  activityProfiles: PropTypes.array,
  setActivityProfiles: PropTypes.func,
  selectedShadingKey: PropTypes.object,
  setSelectedShadingKey: PropTypes.func,
  selectedBioAssay: PropTypes.string,
  setSelectedBioAssay: PropTypes.func,
  assayKeys: PropTypes.object,
};

export default memo(FilterMicroWellPlate);
