import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import {
  Anchor,
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Skeleton,
  Space,
  Typography,
  Descriptions,
} from 'antd';
import { ArrowLeftOutlined, ProfileOutlined } from '@ant-design/icons';
import LogoutHeader from '../../../containers/LogoutHeader';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import ListMoleculev2 from '../../Metadata/ListMoleculev2';
import MoleculeWithModal from '../../Chemistry/MoleculeWithModal';
import TagActivity from '../../Tags/TagActivity';
import TaxonomyTable from '../../Tables/TaxonomyTable';
import ActivityTable from '../../Tables/ActivityTable';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
const { Sider, Content } = Layout;
const { Title } = Typography;
const { Link } = Anchor;

function SmallMoleculePassport(props) {
  const [smallMolecule, setSmallMolecule] = useState({});
  function addNames(mol) {
    const sortedNames = mol.names
      .map(x => capitalizeFirstLetter(x))
      .filter(a => !(parseInt(a, 10) === a))
      .sort((a, b) => a.length - b.length);
    return {
      ...mol,
      bestName: sortedNames[0],
      otherNames: sortedNames.slice(1) || [],
    };
  }
  useEffect(
    () =>
      setSmallMolecule(
        (!!props.verbose.names && addNames(props.verbose)) || [],
      ),
    [props.verbose],
  );

  return (
    <div>
      <Helmet>
        <title> {props.smId} - Small Molecule Passport</title>
        <meta name="description" content="Small Molecule Passport" />
      </Helmet>
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <LogoutHeader />
        <Layout>
          <Sider style={{ backgroundColor: 'white' }}>
            <Row
              style={{ minHeight: '10vh' }}
              type="flex"
              justify="center"
              align="middle"
            >
              <Col>
                <ArrowLeftOutlined
                  style={{
                    color: 'black',
                    fontSize: '32px',
                  }}
                  onClick={() => props.history.goBack()}
                />
              </Col>
            </Row>
          </Sider>
          <Content id="passport-info" style={{ backgroundColor: 'white' }}>
            <Card bordered={false}>
              <div id="passport-header-section">
                <Row>
                  <PassportTypeIcon passportType="smallMolecule" />
                  <Title>Small Molecule Entry: {props.smId} </Title>
                </Row>
              </div>
              <div id="passport-details">
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Summary
                </Divider>
                <Space>
                  <MoleculeWithModal
                    smilesValue={smallMolecule.original_smiles}
                    drawingHeight={200}
                    drawingWidth={400}
                  />
                  <Descriptions
                    bordered
                    title={!!smallMolecule.bestName && smallMolecule.bestName}
                  >
                    <Descriptions.Item span={3} label="Synonyms">
                      {!!smallMolecule.otherNames &&
                        smallMolecule.otherNames.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="PubChem">
                      <Typography.Link
                        href={`https://pubchem.ncbi.nlm.nih.gov/#query=${
                          smallMolecule.original_smiles
                        }`}
                      >
                        Link Out
                      </Typography.Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="ChemSpider">
                      <Typography.Link
                        href={`http://www.chemspider.com/Search.aspx?q=${
                          smallMolecule.original_smiles
                        }`}
                      >
                        Link Out
                      </Typography.Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="ChEMBL">
                      <Typography.Link
                        href={`https://www.ebi.ac.uk/chembl/g/#search_results/all/query=${
                          smallMolecule.original_smiles
                        }`}
                      >
                        Link Out
                      </Typography.Link>
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="Activities">
                      {!!smallMolecule.activitycleaned &&
                        [
                          ...new Set(
                            Object.values(smallMolecule.activitycleaned).map(
                              x => x.activity,
                            ),
                          ),
                        ].map(x => !!x && <TagActivity key={x} activity={x} />)}
                    </Descriptions.Item>
                  </Descriptions>
                </Space>
              </div>
              <div id="similarity">
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Similarity
                </Divider>
                <Card bordered={false}>
                  {props.similarityLoading ? (
                    <Skeleton active />
                  ) : (
                    <ListMoleculev2
                      key="similarity"
                      pageOnChange={props.similarityPagination}
                      total={props.similarityTotal}
                      smallMolecules={props.similarity}
                      pageSize={props.pageSize}
                      metadata={props.metadata}
                    />
                  )}
                </Card>
              </div>
              <div id="substructures">
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Substructures
                </Divider>
                <Card bordered={false}>
                  {props.substructureLoading ? (
                    <Skeleton active />
                  ) : (
                    <ListMoleculev2
                      key="substructures"
                      pageOnChange={props.substructurePagination}
                      total={props.substructureTotal}
                      smallMolecules={props.substructures}
                      pageSize={props.pageSize}
                      metadata={props.metadata}
                    />
                  )}
                </Card>
              </div>
              <div id="targets">
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Targets
                </Divider>
                <ActivityTable
                  activities={
                    props.verbose.activity ? props.verbose.activity : []
                  }
                />
              </div>
              <div id="known-producers">
                <Divider orientation="right">
                  <ProfileOutlined style={{ marginRight: 10 }} />
                  Known Producers
                </Divider>
                <TaxonomyTable
                  taxonomyData={
                    props.verbose.taxonomy_has_smallmolecule
                      ? props.verbose.taxonomy_has_smallmolecule.map(
                        x => Object.values(x)[0],
                      )
                      : []
                  }
                />
              </div>
            </Card>
          </Content>
          <Sider style={{ backgroundColor: 'white' }}>
            <Anchor>
              <Link href="#passport-details" title="Summary" />
              <Link href="#similarity" title="Similarity" />
              <Link href="#substructures" title="Substructures" />
              <Link href="#targets" title="Targets" />
              <Link href="#known-producers" title="Known Producers" />
              <Link href="#predicted-producers" title="Predicted Producers" />
              <Link href="#known-bgcs" title="Known BGCs" />
              <Link href="#predicted-bgcs" title="Predicted BGCs" />
            </Anchor>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

SmallMoleculePassport.propTypes = {
  smId: PropTypes.string,
  history: PropTypes.object,
  metadata: PropTypes.object,
  pageSize: PropTypes.number,
  similarity: PropTypes.array,
  similarityLoading: PropTypes.bool,
  similarityPagination: PropTypes.func,
  similarityTotal: PropTypes.number,
  substructureLoading: PropTypes.bool,
  substructurePagination: PropTypes.func,
  substructureTotal: PropTypes.number,
  substructures: PropTypes.array,
  verbose: PropTypes.object,
};

export default withRouter(memo(SmallMoleculePassport));
