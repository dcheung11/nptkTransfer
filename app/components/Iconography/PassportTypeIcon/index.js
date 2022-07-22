import React, { memo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
  BacteriumIcon,
  DnaIcon,
  PlantIcon,
  FlaskIcon,
  MolIcon,
} from '../Icons';

function PassportTypeIcon(props) {
  let icon;
  switch (props.passportType) {
    case 'taxonomy':
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#eec652',
            marginRight: '20px',
          }}
          icon={<BacteriumIcon style={{ fontSize: '70px' }} />}
        />
      );
      break;
    case 'genome':
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#68c0d0',
            marginRight: '10px',
          }}
          icon={<DnaIcon style={{ fontSize: '30px' }} />}
        />
      );
      break;
    case 'crop':
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#78bf51',
            marginRight: '10px',
          }}
          icon={<PlantIcon style={{ fontSize: '30px' }} />}
        />
      );
      break;
    case 'extract':
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#bf6251',
            marginRight: '10px',
          }}
          icon={<FlaskIcon style={{ fontSize: '30px' }} />}
        />
      );
      break;
    case 'smallMolecule':
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#b89fd4',
            marginRight: '10px',
          }}
          icon={<MolIcon style={{ fontSize: '30px' }} />}
        />
      );
      break;
    default:
      icon = (
        <Avatar
          size={40}
          style={{
            backgroundColor: '#d2094f',
            marginRight: '20px',
          }}
          icon={<UserOutlined />}
        />
      );
  }
  return icon;
}

export default memo(PassportTypeIcon);
