import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Circos from 'react-circos';
import { Card, Tag } from 'antd';

const size = 800;

function GenomeCirclePlot(props) {
  const contigs = [];
  props.genomeMetadata.contigs.map(contig => {
    const contigLayout = {
      label: String(contig.nuc_id),
      len: contig.contig_length,
      id: String(contig.nuc_id),
    };
    contigs.push(contigLayout);
    return undefined;
  });

  const orfs = [];
  props.genomeOrfs.map(orf => {
    const heatmapUnit = {
      block_id: String(orf.nuc_id),
      orf_id: orf.orf_id,
      peptide_id: orf.aa_id,
      start: parseInt(orf.orf_start),
      end: parseInt(orf.orf_stop),
      value: orf.orf_id,
    };
    orfs.push(heatmapUnit);
    return undefined;
  });

  const clusters = [];
  props.submissionClusters.map(cluster => {
    clusters.push({
      block_id: String(cluster.nuc_id),
      cluster_id: cluster.cluster_id,
      start: parseInt(cluster.cluster_start),
      end: parseInt(cluster.cluster_stop),
      value: cluster.cluster_id,
      families: cluster.predicted_families,
    });
    return undefined;
  });

  return (
    <Card bordered={false}>
      <Circos
        size={300}
        layout={contigs.map(contig =>
          Object.assign({ color: '#8dd3c7' }, contig),
        )}
        config={{
          innerRadius: 0.14 * size,
          outerRadius: 0.15 * size,
          ticks: {
            display: false,
          },
          opacity: 0.8,
          labels: {
            position: 'center',
            display: true,
            size: 9,
            color: '#FFF',
            radialOffset: 15,
          },
        }}
        tracks={[
          {
            type: 'HEATMAP',
            data: orfs,
            config: {
              innerRadius: 0.8,
              outerRadius: 0.9,
              logScale: false,
              color: '#2a5aa0',
              opacity: 0.6,
              style: {
                opacity: 0.1,
              },
              tooltipContent: (datum, index) => `ORF ID: ${datum.peptide_id}`,
            },
          },
          {
            type: 'HEATMAP',
            data: clusters,
            config: {
              innerRadius: 0.68,
              outerRadius: 0.7,
              logScale: false,
              color: '#d20c0c',
              opacity: 0.6,
              style: {
                opacity: 0.1,
              },
              tooltipContent: (datum, index) => `BGC ID: ${datum.cluster_id}`,
            },
          },
        ]}
      />
    </Card>
  );
}

GenomeCirclePlot.propTypes = {
  submissionClusters: PropTypes.array,
  genomeMetadata: PropTypes.object,
  genomeOrfs: PropTypes.array,
};

export default memo(GenomeCirclePlot);
