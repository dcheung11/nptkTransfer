import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Card,
  Col,
  Divider,
  Layout,
  Pagination,
  Row,
  Skeleton,
  Space,
  Typography,
  Rate,
  Descriptions,
} from 'antd';
import { ArrowLeftOutlined, ProfileOutlined } from '@ant-design/icons';
import LogoutHeader from '../../../containers/LogoutHeader';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import QuinceCluster from '../../Genomics/QuinceCluster';
import ListMolecule from '../../Metadata/ListMolecule';
const { Content, Sider } = Layout;
const { Title } = Typography;

function HadesPassport(props) {
  return (
    <div>
      <Helmet>
        <title>{props.clusterId} - Quince Passport</title>
        <meta name="description" content="Quince Passport" />
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
                  onClick={() => props.history.push('/apps/quince')}
                />
              </Col>
            </Row>
          </Sider>
          <Content id="passport-info" style={{ backgroundColor: 'white' }}>
            <Space direction="vertical">
              <Card bordered={false}>
                <Card id="passport-header-section" bordered={false}>
                  <Row>
                    <PassportTypeIcon passportType="genome" />
                    <Title>Quince Entry: {props.clusterId} </Title>
                  </Row>
                </Card>
                <Card
                  id="passport-details"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 1000 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Summary
                  </Divider>
                  {props.metadata && (
                    <QuinceCluster metadata={props.metadata} />
                  )}
                  <Row wrap={false} gutter={16} />
                </Card>
                <Card
                  id="passport-known-quince"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 1000 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Known Relatives
                  </Divider>
                  <Card bordered={false}>
                    {props.quinceKnownLoading ? (
                      <Skeleton active />
                    ) : (
                      props.knownData[props.clusterId] && (
                        <ListMolecule
                          smallMolecules={props.knownData[props.clusterId]}
                          pagination={{
                            onChange: props.knownSearch,
                            total: props.knownTotal || 20,
                            pageSizeOptions: [5, 10, 15],
                            hideOnSinglePage: true,
                            pageSize: 5,
                          }}
                        />
                      )
                    )}
                  </Card>
                </Card>
                <Card
                  id="passport-global-quince"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 1000 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Global Relatives
                  </Divider>
                  <Card bordered={false}>
                    {!props.minhashLoading && props.relatives ? (
                      props.relatives.map(hit => (
                        <QuinceCluster
                          metadata={hit}
                          additionalDescriptions={
                            <Descriptions.Item label="Quince Similarity">
                              <Rate
                                disabled
                                allowHalf
                                defaultValue={hit.similarity * 5}
                              />
                            </Descriptions.Item>
                          }
                        />
                      ))
                    ) : (
                      <Skeleton active />
                    )}

                    <Pagination
                      onChange={props.globalSearch}
                      total={props.total}
                      pageSizeOptions={[5, 10, 15]}
                      hideOnSinglePage
                    />
                  </Card>
                </Card>
              </Card>
            </Space>
          </Content>
          <Sider style={{ backgroundColor: 'white' }} />
        </Layout>
      </Layout>
    </div>
  );
}

HadesPassport.propTypes = {
  history: PropTypes.object,
  clusterPrismLoadingStatus: PropTypes.bool,
  metadata: PropTypes.object,
  minhashLoading: PropTypes.bool,
  quinceKnownLoading: PropTypes.bool,
  clusterId: PropTypes.string,
  globalSearch: PropTypes.func,
  knownSearch: PropTypes.func,
  relatives: PropTypes.object,
  knownData: PropTypes.object,
  knownTotal: PropTypes.number,
  total: PropTypes.number,
};

export default withRouter(memo(HadesPassport));
