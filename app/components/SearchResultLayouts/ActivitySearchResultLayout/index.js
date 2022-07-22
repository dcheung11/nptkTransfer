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
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

function ActivitySearchResultLayout(props) {
  return (
    <div>
      <Helmet>
        <title>{`${props.activityStr}`} - Activity Search Result</title>
        <meta name="description" content="Activity Search Result" />
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
                    <ActivitySearch activityStr={props.activityStr} />
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
                        tab={`Activity Molecule Matches (${
                          props.categoryTotal
                        })`}
                        key="1"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              All molecules listed below have a recorded
                              activity categorized under the query of interest.
                              Visit the molecular passport for additional
                              details.
                            </Paragraph>
                          </Card>
                          <Card bordered={false}>
                            {props.categorySmallmoleculeLoading ? (
                              <Skeleton active />
                            ) : (
                              <ListMoleculev2
                                key="identity"
                                pageOnChange={props.categoryPagination}
                                total={props.categoryTotal}
                                smallMolecules={props.categoryMols}
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

ActivitySearchResultLayout.propTypes = {
  history: PropTypes.object,
  activityStr: PropTypes.string,
  pageSize: PropTypes.number,
  metadataLoading: PropTypes.bool,
  metadata: PropTypes.any,
  // Identity
  categorySmallmoleculeLoading: PropTypes.bool,
  categoryPagination: PropTypes.func,
  categoryTotal: PropTypes.number,
  categoryMols: PropTypes.array,
};

export default withRouter(memo(ActivitySearchResultLayout));
