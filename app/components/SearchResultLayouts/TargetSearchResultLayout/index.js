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
import TargetSearch from '../../../containers/TargetSearch';
import GraphBanner from '../../../../public/images/inviand-passport-atlas-white.png';
import styles from '../../Layouts/PassportSearch/styles.less';
import ListMoleculev2 from '../../Metadata/ListMoleculev2';
const { TabPane } = Tabs;
const { Content, Sider } = Layout;
const { Title, Paragraph, Link } = Typography;

function TargetSearchResultLayout(props) {
  return (
    <div>
      <Helmet>
        <title>{`${props.targetStr}`} - Target Search Result</title>
        <meta name="description" content="Target Search Result" />
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
                    <TargetSearch targetStr={props.targetStr} />
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
                        tab={`Target Molecules (${
                          props.targetSmallMoleculeTotal
                        })`}
                        key="1"
                      >
                        <Space direction="vertical">
                          <Card bordered={false}>
                            <Paragraph style={{ color: 'black' }}>
                              All molecules listed below were recorded in
                              literature to interact with the queried targets of
                              interest.
                            </Paragraph>
                          </Card>
                          <Card bordered={false}>
                            {props.targetSmallMoleculeLoading ? (
                              <Skeleton active />
                            ) : (
                              <ListMoleculev2
                                key="target"
                                pageOnChange={
                                  props.targetSmallMoleculePagination
                                }
                                total={props.targetSmallMoleculeTotal}
                                smallMolecules={props.targetSmallMoleculeIds}
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

TargetSearchResultLayout.propTypes = {
  history: PropTypes.object,
  targetStr: PropTypes.string,
  pageSize: PropTypes.number,
  metadataLoading: PropTypes.bool,
  metadata: PropTypes.any,
  // Identity
  targetSmallMoleculeLoading: PropTypes.bool,
  targetSmallMoleculePagination: PropTypes.func,
  targetSmallMoleculeTotal: PropTypes.number,
  targetSmallMoleculeIds: PropTypes.array,
};

export default withRouter(memo(TargetSearchResultLayout));
