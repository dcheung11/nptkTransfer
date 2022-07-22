import React, { memo } from 'react';
import { Card, Image, Typography, Space } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cropApple from '../../../../public/images/crop-apple.png';
import cropBarley from '../../../../public/images/crop-barley.png';
import cropCannabis from '../../../../public/images/crop-cannabis.png';
import cropCanola from '../../../../public/images/crop-canola.png';
import cropCorn from '../../../../public/images/crop-corn.png';
import cropCotton from '../../../../public/images/crop-cotton.png';
import cropGrapes from '../../../../public/images/crop-grapes.png';
import cropLettuce from '../../../../public/images/crop-lettuce.png';
import cropOlive from '../../../../public/images/crop-olive.png';
import cropPotato from '../../../../public/images/crop-potato.png';
import cropRice from '../../../../public/images/crop-rice.png';
import cropSoybean from '../../../../public/images/crop-soybean.png';
import cropStrawberry from '../../../../public/images/crop-strawberry.png';
import cropTomato from '../../../../public/images/crop-tomato.png';
import cropWheat from '../../../../public/images/crop-wheat.png';
import { capitalizeFirstLetter } from '../../../utils/texthelper';

const { Title, Link } = Typography;

const cropImages = {
  0: {
    name: 'apple',
    img: cropApple,
  },
  1: {
    name: 'barley',
    img: cropBarley,
  },
  2: {
    name: 'canola',
    img: cropCanola,
  },
  3: {
    name: 'corn',
    img: cropCorn,
  },
  4: {
    name: 'cotton',
    img: cropCotton,
  },
  5: {
    name: 'grape',
    img: cropGrapes,
  },
  6: {
    name: 'lettuce',
    img: cropLettuce,
  },
  7: {
    name: 'cannabis',
    img: cropCannabis,
  },
  8: {
    name: 'olive',
    img: cropOlive,
  },
  9: {
    name: 'potato',
    img: cropPotato,
  },
  10: {
    name: 'rice',
    img: cropRice,
  },
  11: {
    name: 'soybean',
    img: cropSoybean,
  },
  12: {
    name: 'strawberry',
    img: cropStrawberry,
  },
  13: {
    name: 'tomato',
    img: cropTomato,
  },
  14: {
    name: 'wheat',
    img: cropWheat,
  },
};

function CropButton(props) {
  return (
    <Space direction="vertical" align="center">
      <Card style={{ height: '35vh', cursor: 'pointer' }} bordered={false}>
        <Image src={cropImages[props.cropId].img} preview={false} />
      </Card>
      <Card bordered={false}>
        {props.showName && (
          <Space direction="vertical" align="center">
            <Title level={3}>
              {capitalizeFirstLetter(cropImages[props.cropId].name)}
            </Title>
            <Link>{`Learn more >`}</Link>
          </Space>
        )}
      </Card>
    </Space>
  );
}

CropButton.propTypes = {
  cropId: PropTypes.number.isRequired,
  showName: PropTypes.bool,
};

export default withRouter(memo(CropButton));
