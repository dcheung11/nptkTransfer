import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tree, Badge, Typography, Space } from 'antd';
import TagTaxonomy from '../../Tags/TagTaxonomy';
import { DnaIcon, FlaskIcon, MolIcon } from '../../Iconography/Icons';
const { Link } = Typography;

function TreeNodeFromChildNode(childNode) {
  const linksOut = [];
  if (childNode.submissionCount) {
    linksOut.push(
      <Badge
        key="submissionCount"
        count={childNode.submissionCount}
        offset={[5]}
        style={{ backgroundColor: '#ABDEE6' }}
      >
        <DnaIcon style={{ fontSize: '26px', color: '#ABDEE6' }} />
      </Badge>,
    );
  }
  if (childNode.smallMoleculeCount) {
    linksOut.push(
      <Badge
        key="smCount"
        count={childNode.smallMoleculeCount}
        offset={[5]}
        style={{ backgroundColor: '#CBAACB' }}
      >
        <MolIcon style={{ fontSize: '26px', color: '#CBAACB' }} />
      </Badge>,
    );
  }
  if (childNode.extractCount) {
    linksOut.push(
      <Badge
        key="extractCount"
        count={childNode.extractCount}
        style={{ backgroundColor: '#FFCCB6' }}
        offset={[5]}
      >
        <FlaskIcon style={{ fontSize: '26px', color: '#FFCCB6' }} />
      </Badge>,
    );
  }
  return {
    title: (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link onClick={() => childNode.linkOut()} style={{ fontSize: '12px' }}>
        <Space>
          {childNode.name} <TagTaxonomy rank={childNode.rank} />
          {linksOut}
        </Space>
      </Link>
    ),
    key: `${childNode.taxonomyId}_${childNode.name}`,
    children: childNode.childNodes,
  };
}

TreeNodeFromChildNode.propTypes = {
  taxonomyId: PropTypes.number,
  name: PropTypes.string,
  rank: PropTypes.string,
  extractCount: PropTypes.number,
  smallMoleculeCount: PropTypes.number,
  submissionCount: PropTypes.number,
  children: PropTypes.node,
};

function TaxonomyNodeTree(props) {
  const children = props.childNodes.map(child =>
    TreeNodeFromChildNode({
      key: child.taxonomy_id,
      taxonomyId: child.taxonomy_id,
      name: child.name,
      rank: child.rank,
      extractCount: child.extractcount,
      smallMoleculeCount: child.moleculecount,
      submissionCount: child.submissioncount,
      linkOut: () =>
        props.history.push(`/apps/taxonomy/results/${child.taxonomy_id}`),
    }),
  );
  const reducer = (node1, node2) =>
    TreeNodeFromChildNode({
      key: node2.taxonomy_id,
      taxonomyId: node2.taxonomy_id,
      name: node2.name,
      rank: node2.rank,
      extractCount: node2.extractcount,
      smallMoleculeCount: node2.moleculecount,
      submissionCount: node2.submissioncount,
      childNodes: [node1].flat(),
      linkOut: () =>
        props.history.push(`/apps/taxonomy/results/${node2.taxonomy_id}`),
    });
  const nested = props.parentNodes.reduce(reducer, children);
  return (
    <Tree
      key="family-tree"
      treeData={[nested]}
      defaultExpandedKeys={props.parentNodes
        .slice(-props.parentNodes.length + 1)
        .map(node => `${node.taxonomy_id}_${node.name}`)}
    />
  );
}

TaxonomyNodeTree.propTypes = {
  history: PropTypes.object,
  childNodes: PropTypes.array,
  parentNodes: PropTypes.array,
};

export default withRouter(memo(TaxonomyNodeTree));
