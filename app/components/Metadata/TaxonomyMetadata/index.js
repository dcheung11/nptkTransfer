import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import { Descriptions, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import TagTaxonomy from '../../Tags/TagTaxonomy';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
const { Link } = Typography;
function TaxonomyMetadata(props) {
  const descriptions = [];
  // Clean up and Parse Taxonomy Tree Meta Data
  ['kingdom', 'phylum', 'order', 'family', 'genus'].map(taxLevel => {
    props.tax[taxLevel]
      ? descriptions.push(
        <Descriptions.Item
          label={capitalizeFirstLetter(taxLevel)}
          key={taxLevel}
        >
          <Link
            onClick={() =>
              props.history.push(
                `/apps/taxonomy/results/${props.tax[`${taxLevel}_id`]}`,
              )
            }
          >
            <i>{capitalizeFirstLetter(props.tax[taxLevel])}</i>
          </Link>
        </Descriptions.Item>,
      )
      : descriptions.push(
        <Descriptions.Item
            label={capitalizeFirstLetter(taxLevel)}
          key={taxLevel}
          >
            <i>-</i>
        </Descriptions.Item>,
      );
    return undefined;
  });
  // Do Species separate because not Capitalise and I'm too lazy to add conditional
  props.tax.species
    ? descriptions.push(
      <Descriptions.Item label="Species" key="species">
        <Link
          onClick={() =>
            props.history.push(
              `/apps/taxonomy/results/${props.tax.species_id}`,
            )
          }
        >
          <i>{props.tax.species}</i>
        </Link>
      </Descriptions.Item>,
    )
    : descriptions.push(
      <Descriptions.Item label="Species" key="species">
        <i>-</i>
      </Descriptions.Item>,
    );
  // Do Strain last
  props.tax.strain
    ? descriptions.push(
      <Descriptions.Item label="Strain" key="strain">
          <Link
          onClick={() =>
            props.history.push(
              `/apps/taxonomy/results/${props.tax.strain_id}`,
              )
          }
        >
          <i>{capitalizeFirstLetter(props.tax.strain)}</i>
          </Link>
      </Descriptions.Item>,
    )
    : descriptions.push(
      <Descriptions.Item label="Strain" key="strain">
        <i>-</i>
      </Descriptions.Item>,
    );

  return (
    <Descriptions
      bordered
      column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
    >
      {descriptions}
      <Descriptions.Item label="NCBI ID" key="ncbiId">
        {props.ncbiId ? (
          <Link
            href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${
              props.ncbiId
            }`}
          >
            {props.ncbiId}
          </Link>
        ) : (
          <i>-</i>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Rank" key="rank">
        <TagTaxonomy rank={props.rank} />
      </Descriptions.Item>
    </Descriptions>
  );
}

TaxonomyMetadata.propTypes = {
  rank: PropTypes.string,
  history: PropTypes.object,
  tax: PropTypes.object,
  ncbiId: PropTypes.number,
};

export default withRouter(memo(TaxonomyMetadata));
