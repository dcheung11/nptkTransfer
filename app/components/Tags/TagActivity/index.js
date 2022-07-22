import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
import {
  MosquitoIcon,
  LightningIcon,
  VirusIcon,
  BugIcon,
} from '../../Iconography/Icons';
export const metaMap = {
  antiparasitic: {
    icon: '',
    color: '#D4F0F0',
  },
  'toxin class i': {
    icon: '',
    color: '#FFAACC',
  },
  'toxin class ii': {
    icon: '',
    color: '#FFBBCC',
  },
  'toxin class iii': {
    icon: '',
    color: '#FFCCCC',
  },
  'toxin class iv': {
    icon: '',
    color: '#FFDDCC',
  },
  anticancer: {
    icon: <LightningIcon />,
    color: '#FFEECC',
  },
  antiviral: {
    icon: <VirusIcon />,
    color: '#CCFFCC',
  },
  plant_promoter: {
    icon: <BugIcon />,
    color: '#CCEECC',
  },
  antitubercular: {
    icon: '',
    color: '#CCAACC',
  },
  antifungal: {
    icon: '',
    color: '#CCDDDD',
  },
  immunosupressant: {
    icon: '',
    color: '#FFC8A2',
  },
  siderophore: {
    icon: '',
    color: '#CBAACB',
  },
  antimalarial: {
    icon: <MosquitoIcon />,
    color: '#FF968A',
  },
  antibacterial: {
    icon: <LightningIcon />,
    color: '#8FCACA',
  },
  herbicide: {
    icon: <BugIcon />,
    color: '#CCE2CB',
  },
};

function TagActivity(props) {
  return (
    <Tag color={metaMap[props.activity].color}>
      {metaMap[props.activity].icon}
      {capitalizeFirstLetter(props.activity)}
    </Tag>
  );
}

TagActivity.propTypes = {
  activity: PropTypes.string,
};

export default memo(TagActivity);
