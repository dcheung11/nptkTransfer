import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import TagActivity from '../../Tags/TagActivity';

function ExtractMetadata(props) {
  const extractMetadataLookup = props.extractsMetadata[props.extractId];
  return (
    <Descriptions bordered>
      <Descriptions.Item label="Extract ID" span={1}>
        <Link
          to={location => ({
            ...location,
            pathname: `/apps/extract/results/${props.extractId}`,
          })}
        >
          {props.extractId}
        </Link>
      </Descriptions.Item>
      <Descriptions.Item label="Taxonomy ID" span={1}>
        {props.cultureMetadata.taxonomy_id ? (
          <Link
            to={location => ({
              ...location,
              pathname: `/apps/taxonomy/results/${
                props.cultureMetadata.taxonomy_id
              }`,
            })}
          >
            {props.cultureMetadata.taxonomy_id}
          </Link>
        ) : (
          '-'
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Culture ID" span={1}>
        {props.cultureMetadata.culture_id || '-'}
      </Descriptions.Item>
      <Descriptions.Item label="Extraction Date" span={3}>
        {extractMetadataLookup ? extractMetadataLookup.extraction_date : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="Extraction Method" span={3}>
        {!!extractMetadataLookup &&
        !!extractMetadataLookup.extract_extraction_method
          ? extractMetadataLookup.extract_extraction_method.name
          : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="Activities" span={3}>
        {!!props.activity &&
          props.activity.map(x => <TagActivity key={uuidv4()} activity={x} />)}
      </Descriptions.Item>
      <Descriptions.Item label="Comments" span={3}>
        {extractMetadataLookup ? extractMetadataLookup.comments : '-'}
      </Descriptions.Item>
    </Descriptions>
  );
}

ExtractMetadata.propTypes = {
  extractId: PropTypes.number,
  activity: PropTypes.array,
  extractsMetadata: PropTypes.object,
  cultureMetadata: PropTypes.object,
};

export default memo(ExtractMetadata);
