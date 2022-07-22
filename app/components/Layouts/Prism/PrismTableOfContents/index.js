import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'antd';
const { Link } = Anchor;

function PuffinTableOfContents(props) {
  const allAnchors = props.genomeMetadata.contigs.map(contig => (
    <Link
      href={`#contig-${contig.nuc_id}`}
      title={`CID: ${contig.nuc_id}`}
      key={`contig-link-${contig.nuc_id}`}
    >
      {props.includeClusters &&
        contig.clusters.map(cluster => (
          <Link
            href={`#cluster-${cluster.cluster_id}`}
            title={`BGC: ${cluster.cluster_id}`}
            key={`cluster-link-${cluster.cluster_id}`}
          />
        ))}
    </Link>
  ));
  return (
    <Anchor>
      <Link href="#passport-details" title="Summary" key="summary" />
      {allAnchors}
      <Link href="#contig-stats" title="Contig QA" key="contig-stats" />
    </Anchor>
  );
}

PuffinTableOfContents.propTypes = {
  genomeMetadata: PropTypes.object,
  includeClusters: PropTypes.bool,
};

export default memo(PuffinTableOfContents);
