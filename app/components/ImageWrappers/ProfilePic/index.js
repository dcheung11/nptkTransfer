import React, { memo } from 'react';
import { Avatar, Col, Row, Image, Space } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import defaultProfile from '../../../../public/images/default_profile.png';
import { capitalizeFirstLetter } from '../../../utils/texthelper';

function ProfilePic(props) {
  // Time Greeting
  const rn = new Date().getHours();

  let name;
  if (props.user) {
    name = capitalizeFirstLetter(props.user.nickname);
  }
  if (!!props.firstName && !!props.lastName) {
    name = `${capitalizeFirstLetter(props.firstName)} ${capitalizeFirstLetter(
      props.lastName,
    )}`;
  }
  let greeting;
  if (rn < 12) {
    greeting = `Good Morning, ${name}.`;
  } else if (rn < 18 && rn >= 12) {
    greeting = `Good Afternoon, ${name}.`;
  } else {
    greeting = `Good Evening, ${name}.`;
  }
  return (
    <div id="profile-greeting">
      <Row type="flex" justify="center">
        <Space direction="vertical">
          <Row justify="center" style={{ minHeight: '20vh' }}>
            <Col size={4}>
              <Avatar
                size={256}
                src={
                  props.user ? (
                    props.user.picture
                  ) : (
                    <Image src={defaultProfile} preview={false} />
                  )
                }
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col>
              <h1>{greeting}</h1>
            </Col>
          </Row>
        </Space>
      </Row>
    </div>
  );
}

ProfilePic.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  user: PropTypes.object,
};

export default withRouter(memo(ProfilePic));
