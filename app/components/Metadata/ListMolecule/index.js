import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Rate, Row, Space } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MoleculeWithModal from '../../Chemistry/MoleculeWithModal';
import TagActivity from '../../Tags/TagActivity';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
import { DnaIcon, FlaskIcon } from '../../Iconography/Icons';
const { Text } = Typography;

function ListMolecule(props) {
  function getPreferredName(names) {
    return names
      .map(x => capitalizeFirstLetter(x))
      .filter(a => !(parseInt(a, 10) === a))
      .sort((a, b) => a.length - b.length)[0];
  }
  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={
        props.pagination || {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }
      }
      dataSource={props.smallMolecules}
      renderItem={item => (
        <List.Item
          key={`${uuidv4()}-${item.smallmolecule_id}`}
          extra={
            <MoleculeWithModal
              drawingWidth={272}
              alt="logo"
              smilesValue={item.original_smiles}
              uuid={uuidv4()}
              title={!!item.names && getPreferredName(item.names)}
            />
          }
        >
          <List.Item.Meta
            // title={getPreferredName(item.names)}
            title={
              <Link
                to={location => ({
                  ...location,
                  pathname: `/apps/smallmolecule/results/${
                    item.smallmolecule_id
                  }`,
                })}
              >
                {!!item.names && getPreferredName(item.names)}
              </Link>
            }
            description={
              !!item.activity &&
              item.activity.map(
                (name, idx) =>
                  !!name && (
                    <TagActivity key={`${name}-${idx}`} activity={name}>
                      {name}
                    </TagActivity>
                  ),
              )
            }
          />
          <Space direction="vertical" size={40}>
            {!!item.similarity && (
              <Row>
                <Text>
                  <b>Similarity: </b>
                  <Rate disabled allowHalf defaultValue={item.similarity * 5} />
                </Text>
              </Row>
            )}
            <Row>
              <b>Synonyms: </b>
              {!!item.names &&
                item.names
                  .map(x => capitalizeFirstLetter(x))
                  .sort((a, b) => a.length - b.length)
                  .slice(1)
                  .join(', ')}
            </Row>
            {!!item.analog_validation && (
              <Row>
                <Text>
                  <b>Validation: </b>
                  {item.analog_validation === 'metabolomic' && (
                    <FlaskIcon style={{ fontSize: '26px', color: '#FFCCB6' }} />
                  )}
                  {item.analog_validation === 'metabologenomic' && (
                    <>
                      <FlaskIcon
                        style={{ fontSize: '26px', color: '#FFCCB6' }}
                      />{' '}
                      <DnaIcon style={{ fontSize: '26px', color: '#ABDEE6' }} />
                    </>
                  )}
                  {item.analog_validation === 'genomic' && (
                    <DnaIcon style={{ fontSize: '26px', color: '#ABDEE6' }} />
                  )}
                </Text>
              </Row>
            )}
          </Space>
        </List.Item>
      )}
    />
  );
}

ListMolecule.propTypes = {
  smallMolecules: PropTypes.array,
  pagination: PropTypes.object,
};

export default withRouter(memo(ListMolecule));
