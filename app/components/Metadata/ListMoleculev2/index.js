import React, { memo } from 'react';
import { List, Rate, Row, Space, Typography, Skeleton } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import MoleculeWithModal from '../../Chemistry/MoleculeWithModal';
import TagActivity from '../../Tags/TagActivity';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
const { Text, Paragraph } = Typography;

function ListMoleculev2(props) {
  function addNames(mol) {
    const sortedNames = mol.names
      .map(x => capitalizeFirstLetter(x))
      .filter(a => !(parseInt(a, 10) === a))
      .sort((a, b) => a.length - b.length);
    return {
      ...mol,
      bestName: sortedNames[0],
      otherNames: (!!sortedNames.slice(1) && sortedNames.slice(1)) || [],
    };
  }
  return (
    <List
      style={props.style}
      key={props.key}
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: props.pageOnChange,
        total: props.total,
        hideOnSinglePage: true,
        pageSize: props.pageSize,
      }}
      dataSource={props.smallMolecules}
      renderItem={mol => {
        const molMetadata = props.metadata[mol.smallmolecule_id];
        if (molMetadata === undefined) {
          return <Skeleton active />;
        }
        const newMol = addNames(molMetadata);
        return (
          <List.Item
            key={`${uuidv4()}-${newMol.smallmolecule_id}`}
            extra={
              <MoleculeWithModal
                drawingWidth={272}
                alt="logo"
                smilesValue={molMetadata.original_smiles}
                title={molMetadata.bestName}
              />
            }
          >
            <List.Item.Meta
              key={`${uuidv4()}-${newMol.smallmolecule_id}-meta`}
              title={
                <Link
                  to={location => ({
                    ...location,
                    pathname: `/apps/smallmolecule/results/${
                      mol.smallmolecule_id
                    }`,
                  })}
                >
                  {newMol.bestName}
                </Link>
              }
              description={[...new Set(molMetadata.activities)].map(
                (name, idx) =>
                  !!name && (
                    // eslint-disable-next-line react/no-array-index-key
                    <TagActivity key={`${name}-${idx}`} activity={name}>
                      {name}
                    </TagActivity>
                  ),
              )}
            />
            <Space direction="vertical" size={40}>
              {!!mol.similarity && (
                <Row>
                  <Text>
                    <b>Similarity: </b>
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={mol.similarity * 5}
                    />
                  </Text>
                </Row>
              )}
              <Row>
                <b>Synonyms: </b>
                <Paragraph>{newMol.otherNames.join(', ')} </Paragraph>
              </Row>
              <Row>
                <b>Known Producers: </b>
                <Paragraph>
                  {[...new Set(molMetadata.producers)].map((x, idx) => (
                    <Link
                      to={location => ({
                        ...location,
                        pathname: `/apps/taxonomy/results/${x}`,
                      })}
                      key={uuidv4()}
                    >
                      {` ${x}${
                        !(idx === molMetadata.producers.length - 1) ? ',' : ''
                      }`}
                    </Link>
                  ))}
                </Paragraph>
              </Row>
            </Space>
          </List.Item>
        );
      }}
    />
  );
}

ListMoleculev2.propTypes = {
  history: PropTypes.object,
  key: PropTypes.string,
  pageOnChange: PropTypes.func,
  total: PropTypes.number,
  smallMolecules: PropTypes.array,
  pageSize: PropTypes.number,
  metadata: PropTypes.object,
  style: PropTypes.object,
};

export default withRouter(memo(ListMoleculev2));
