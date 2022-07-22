import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';
import TagTaxonomy from '../../Tags/TagTaxonomy';

function TaxonomyTable(props) {
  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Rank',
      key: 'rank',
      dataIndex: 'rank',
      render: x => <TagTaxonomy rank={x} />,
    },
    // {
    //   title: 'Path',
    //   key: 'path',
    //   dataIndex: 'path',
    // },
    {
      title: 'Taxonomy ID',
      key: 'taxonomy_id',
      dataIndex: 'taxonomy_id',
      render: x => <Link to={`/apps/taxonomy/results/${x}`}>{x}</Link>,
    },
    {
      title: 'NCBI ID',
      key: 'ncbi_id',
      dataIndex: 'ncbi_id',
      render: x =>
        x ? (
          <Typography.Link
            href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${x}`}
          >
            {x}
          </Typography.Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Kingdom',
      key: 'kingdom',
      dataIndex: 'tax',
      render: x => (
        <Link to={`/apps/taxonomy/results/${x.kingdom_id}`}>{x.kingdom}</Link>
      ),
    },
    {
      title: 'Phylum',
      key: 'phylum',
      dataIndex: 'tax',
      render: x => (
        <Link to={`/apps/taxonomy/results/${x.phylum_id}`}>{x.phylum}</Link>
      ),
    },
    {
      title: 'Class',
      key: 'class',
      dataIndex: 'tax',
      render: x =>
        x.class ? (
          <Link to={`/apps/taxonomy/results/${x.class_id}`}>{x.class}</Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Order',
      key: 'order',
      dataIndex: 'tax',
      render: x =>
        x.order ? (
          <Link to={`/apps/taxonomy/results/${x.order_id}`}>{x.order}</Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Genus',
      key: 'genus',
      dataIndex: 'tax',
      render: x =>
        x.genus ? (
          <Link to={`/apps/taxonomy/results/${x.genus_id}`}>{x.genus}</Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Species',
      key: 'species',
      dataIndex: 'tax',
      render: x =>
        x.species ? (
          <Link to={`/apps/taxonomy/results/${x.species_id}`}>{x.species}</Link>
        ) : (
          '-'
        ),
    },
    {
      title: 'Strain',
      key: 'strain',
      dataIndex: 'tax',
      render: x =>
        x.strain ? (
          <Link to={`/apps/taxonomy/results/${x.strain_id}`}>{x.strain}</Link>
        ) : (
          '-'
        ),
    },
  ];
  return <Table dataSource={props.taxonomyData} columns={columns} />;
}
TaxonomyTable.propTypes = {
  taxonomyData: PropTypes.array,
};

export default withRouter(memo(TaxonomyTable));
