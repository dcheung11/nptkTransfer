import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Tree, Badge, Space } from 'antd';
import TagTaxonomy from '../../Tags/TagTaxonomy';
import { DnaIcon, FlaskIcon, MolIcon } from '../../Iconography/Icons';

// eslint-disable no-param-reassign
function TaxonomyNodeTree(props) {
  /* Annotation Functions */
  function getTreeNode(node) {
    const badges = [];
    const thisKey =
      (!!node.taxonomy_id && `${node.taxonomy_id}_${node.name}`) ||
      `${uuidv4()}`;
    if (node.submissioncount) {
      badges.push(
        <Badge
          key="submissionCount"
          count={node.submissioncount}
          offset={[5]}
          style={{ backgroundColor: '#ABDEE6' }}
        >
          <DnaIcon style={{ fontSize: '26px', color: '#ABDEE6' }} />
        </Badge>,
      );
    }
    if (node.moleculecount) {
      badges.push(
        <Badge
          key="smCount"
          count={node.moleculecount}
          offset={[5]}
          style={{ backgroundColor: '#CBAACB' }}
        >
          <MolIcon style={{ fontSize: '26px', color: '#CBAACB' }} />
        </Badge>,
      );
    }
    if (node.extractcount) {
      badges.push(
        <Badge
          key="extractCount"
          count={node.extractcount}
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
        <Space>
          <Link to={`/apps/taxonomy/results/${node.taxonomy_id}`}>
            {node.name}
          </Link>{' '}
          <TagTaxonomy rank={node.rank} />
          {badges}
        </Space>
      ),
      key: thisKey,
    };
  }

  /* Annotating the Input tree */
  const cleanedChildNodes = props.childNodes.map(x => getTreeNode(x));
  const cleanedParentNodes = props.parentNodes
    .map(x => getTreeNode(x))
    .reverse();
  if (cleanedParentNodes) {
    cleanedParentNodes.map((x, idx) => {
      if (x) {
        const nextNode = cleanedParentNodes[idx + 1];
        if (nextNode) {
          // eslint-disable-next-line no-param-reassign
          x.children = [nextNode];
        }
      }
      return undefined;
    });
  }

  /* Joining the children and parent trees */
  const bottomParent = cleanedParentNodes.slice(-1)[0];
  if (bottomParent) {
    bottomParent.children = cleanedChildNodes;
  }
  return (
    !!cleanedParentNodes[0] && (
      <Tree
        key="family-tree"
        treeData={[cleanedParentNodes[0]]}
        defaultExpandableKeys={cleanedParentNodes.map(x => x.key)}
        defaultExpandAll
      />
    )
  );
}
TaxonomyNodeTree.propTypes = {
  history: PropTypes.object,
  childNodes: PropTypes.array,
  parentNodes: PropTypes.array,
};
export default memo(TaxonomyNodeTree);
