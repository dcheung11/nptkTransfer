import React, { memo } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

function TagTaxonomy(props) {
  const colorLookup = {
    kingdom: 'magenta',
    phylum: 'red',
    class: 'volcano',
    order: 'gold',
    family: 'lime',
    genus: 'green',
    species: 'cyan',
    strain: 'blue',
  };
  return <Tag color={colorLookup[props.rank]}>{props.rank}</Tag>;
}

TagTaxonomy.propTypes = {
  rank: PropTypes.string,
};

export default memo(TagTaxonomy);
