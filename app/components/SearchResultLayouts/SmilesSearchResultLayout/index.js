import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import {
  Layout,
  Tabs,
  Card,
  Space,
  Row,
  Typography,
  Skeleton,
  Image,
} from 'antd';
import LogoutHeader from '../../../containers/LogoutHeader';
import SmilesSearch from '../../SearchBars/SmilesSearch';
import GraphBanner from '../../../../public/images/inviand-passport-atlas-white.png';
import styles from '../../Layouts/PassportSearch/styles.less';
import ListMoleculev2 from '../../Metadata/ListMoleculev2';
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Title, Paragraph, Link } = Typography;

function SmilesSearchResultLayout(props) {
  return (
    <div>
      <Helmet>
        <title>{`${props.smilesStr}`} - SMILES Search Result</title>
        <meta name="description" content="SMILES Search Result" />
      </Helmet>
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <LogoutHeader />
        <Layout>
          <Content>
            <Content className={styles.taxonomySearch}>
              <Row align="center">
                <Card
                  style={{ backgroundColor: 'transparent' }}
                  bordered={false}
                >
                  <Image
                    width={250}
                    src={GraphBanner}
                    preview={false}
                    onClick={() => props.history.push('/apps/passport')}
                    style={{ cursor: 'pointer' }}
                  />
                </Card>
                <Card
                  style={{ backgroundColor: 'transparent' }}
                  bordered={false}
                >
                  <Space direction="vertical">
                    <Title style={{ color: 'white' }} level={5}>
                      SEARCH FOR
                    </Title>
                    <SmilesSearch smilesStr={props.smilesStr} />
                    <Paragraph style={{ color: 'white' }}>
                      Treating this as a structure search for a SMILES
                      identifier. Switch to <Link>SMARTS</Link>.
                    </Paragraph>
                  </Space>
                </Card>
              </Row>
            </Content>
            <Layout>
              <Sider style={{ backgroundColor: 'white' }} />
              <Content style={{ backgroundColor: 'white' }}>
                <Row align="center">
                  <Card bordered={false}>
                    <Tabs defaultActiveKey="1" centered="true">
                      <TabPane
                        tab={`Identity (${props.identityTotal})`}
                        key="1"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              Identities are highly related molecules. The
                              molecules share a Tanimoto similarity above 0.9
                              using ECFP6 featurization.
                            </Paragraph>
                          </Card>
                          <Card bordered={false}>
                            {props.identityLoading ? (
                              <Skeleton active />
                            ) : (
                              <ListMoleculev2
                                key="identity"
                                pageOnChange={props.identityPagination}
                                total={props.identityTotal}
                                smallMolecules={props.identity}
                                pageSize={props.pageSize}
                                metadata={props.metadata}
                              />
                            )}
                          </Card>
                        </Space>
                      </TabPane>
                      <TabPane
                        tab={`Similarity (${props.similarityTotal})`}
                        key="2"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              Similarity molecules are highly related molecules.
                              The molecules share a Tanimoto similarity above
                              0.7 using FCFP6 featurization.
                            </Paragraph>
                          </Card>
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
                        </Space>
                      </TabPane>
                      <TabPane
                        tab={`Substructures (${props.substructureTotal})`}
                        key="3"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              Substructures are molecules containing the query
                              SMILES as a substucture.
                            </Paragraph>
                          </Card>
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
                        </Space>
                      </TabPane>
                      <TabPane tab="Natural Product Superstructure" key="4">
                        BEAR breakdowns go here!
                      </TabPane>
                    </Tabs>
                  </Card>
                </Row>
              </Content>
              <Sider style={{ backgroundColor: 'white' }} />
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

SmilesSearchResultLayout.propTypes = {
  history: PropTypes.object,
  smilesStr: PropTypes.string,
  pageSize: PropTypes.number,
  metadataLoading: PropTypes.bool,
  metadata: PropTypes.any,
  // Identity
  identityLoading: PropTypes.bool,
  identityPagination: PropTypes.func,
  identityTotal: PropTypes.number,
  identity: PropTypes.array,
  // Similarity
  similarityLoading: PropTypes.bool,
  similarityPagination: PropTypes.func,
  similarityTotal: PropTypes.number,
  similarity: PropTypes.array,
  // Similarity
  substructureLoading: PropTypes.bool,
  substructurePagination: PropTypes.func,
  substructureTotal: PropTypes.number,
  substructures: PropTypes.array,
};

export default withRouter(memo(SmilesSearchResultLayout));
