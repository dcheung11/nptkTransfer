import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Typography, Checkbox, Col, Row } from 'antd';
import TagActivity, { metaMap } from '../../Tags/TagActivity';

const { Title } = Typography;

function FilterMetabolomics(props) {
  /* Local States in case user presses cancel */
  const [activityProfiles, setActivityProfiles] = useState(
    props.activityProfiles,
  );

  const handleOk = () => {
    props.setIsModalVisible(false);
    props.setActivityProfiles(activityProfiles);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setActivityProfiles(props.activityProfiles);
  };

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
        </Card>
      </div>
    </Modal>
  );
}

FilterMetabolomics.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  activityProfiles: PropTypes.array,
  setActivityProfiles: PropTypes.func,
};

export default memo(FilterMetabolomics);
