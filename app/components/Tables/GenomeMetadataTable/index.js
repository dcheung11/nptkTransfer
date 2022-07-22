import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Descriptions, Typography } from 'antd';
const { Link } = Typography;

function GenomeMetadataTable(props) {
  const totalSubmissionLength = props.genomeMetadata.contigs
    .map(contig => contig.contig_length)
    .reduce((a, b) => a + b, 0);
  const totalGeneCount = props.genomeMetadata.contigs
    .map(contig => contig.gene_count)
    .reduce((a, b) => a + b, 0);
  const geneDensity = ((totalGeneCount / totalSubmissionLength) * 1e6).toFixed(
    2,
  );
  const gcContent = (
    props.genomeMetadata.contigs
      .map(contig => contig.gc_content)
      .reduce((a, b) => a + b, 0) / props.genomeMetadata.contigs.length
  ).toFixed(2);

  return (
    <Descriptions bordered>
      <Descriptions.Item label="Job ID" span={1}>
        {props.resultId}
      </Descriptions.Item>
      <Descriptions.Item label="Predicted Taxonomy">
        <Link
          onClick={() =>
            props.history.push(
              `/apps/taxonomy/results/${props.genomeMetadata.taxonomy_id}`,
            )
          }
        >
          {props.genomeMetadata.taxonomy_id}
        </Link>
      </Descriptions.Item>
      <Descriptions.Item label="Submitted By" span={2}>
        {props.genomeMetadata.submitted_by}
      </Descriptions.Item>
      <Descriptions.Item label="Filename" span={3}>
        {props.genomeMetadata.submission_fh.split(/[\\/]/).pop()}
      </Descriptions.Item>
      <Descriptions.Item label="Total Contigs">
        {props.genomeMetadata.contigs.length}
      </Descriptions.Item>
      <Descriptions.Item label="Total Clusters">
        {props.submissionClusters.length}
      </Descriptions.Item>
      <Descriptions.Item label="Total Genes">
        {totalGeneCount}
      </Descriptions.Item>
      <Descriptions.Item label="Total Length">
        {totalSubmissionLength.toLocaleString()} bp
      </Descriptions.Item>
      <Descriptions.Item label="Gene Density">
        {geneDensity} genes/Mb
      </Descriptions.Item>
      <Descriptions.Item label="GC Content">{gcContent}%</Descriptions.Item>
    </Descriptions>
  );
}

GenomeMetadataTable.propTypes = {
  history: PropTypes.object,
  resultId: PropTypes.string,
  submissionClusters: PropTypes.array,
  genomeMetadata: PropTypes.object,
};

export default withRouter(memo(GenomeMetadataTable));
