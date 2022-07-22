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
import ActivitySearch from '../../SearchBars/ActivitySearch';
import GraphBanner from '../../../../public/images/inviand-passport-atlas-white.png';
import styles from '../../Layouts/PassportSearch/styles.less';
import ListMoleculev2 from '../../Metadata/ListMoleculev2';
import MoleculeNameSearch from '../../SearchBars/MoleculeNameSearch';
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

function MoleculeNameSearchResultLayout(props) {
  return (
    <div>
      <Helmet>
        <title>{`${props.queryStr}`} - Molecule Name Search Result</title>
        <meta name="description" content="Molecule Name Search Result" />
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
                    <MoleculeNameSearch queryStr={props.queryStr} />
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
                        tab={`Name Matches (${props.nameSmallMoleculeTotal})`}
                        key="1"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              All molecules listed below have an alias matching
                              to the query molecule name. Partial matches are
                              also included.
                            </Paragraph>
                          </Card>
                          <Card bordered={false}>
                            {props.nameSmallmoleculeLoading ? (
                              <Skeleton active />
                            ) : (
                              <ListMoleculev2
                                key="identity"
                                pageOnChange={props.nameSmallmoleculePagination}
                                total={props.nameSmallMoleculeTotal}
                                smallMolecules={props.nameSmallMolecule}
                                pageSize={props.pageSize}
                                metadata={props.metadata}
                              />
                            )}
                          </Card>
                        </Space>
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

MoleculeNameSearchResultLayout.propTypes = {
  history: PropTypes.object,
  queryStr: PropTypes.string,
  pageSize: PropTypes.number,
  metadataLoading: PropTypes.bool,
  metadata: PropTypes.any,
  // Name Molecules
  nameSmallmoleculeLoading: PropTypes.bool,
  nameSmallmoleculePagination: PropTypes.func,
  nameSmallMoleculeTotal: PropTypes.number,
  nameSmallMolecule: PropTypes.array,
};

export default withRouter(memo(MoleculeNameSearchResultLayout));
