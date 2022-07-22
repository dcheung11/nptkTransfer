import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  Card,
  Col,
  Divider,
  Layout,
  Skeleton,
  Space,
  Typography,
  Row,
} from 'antd';
import {
  YuqueFilled,
  ArrowLeftOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';

import LogoutHeader from '../../../containers/LogoutHeader';
import GenomeCirclePlot from '../../Genomics/GenomeCirclePlot';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import PrismResult from '../../Genomics/PrismResult';
import GenomeMetadataTable from '../../Tables/GenomeMetadataTable';
import PrismTableOfContents from '../../Layouts/Prism/PrismTableOfContents';
import ContigTable from '../../Tables/ContigTable';
const { Sider, Content } = Layout;
const { Title } = Typography;

function PrismPassport(props) {
  return (
    <div>
      <Helmet>
        <title> {props.resultId} - PRISM Passport</title>
        <meta name="description" content="Prism Passport" />
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
                  onClick={() => props.history.push('/apps/puffin')}
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
                    <Title>PRISM Entry: {props.resultId} </Title>
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
                  <Row wrap={false} gutter={16}>
                    <Col span={8}>
                      {props.metadataLoadingStatus ||
                      props.clustersLoadingStatus ||
                      props.orfsLoadingStatus ? (
                        <Skeleton.Avatar active size={250} />
                        ) : (
                        <GenomeCirclePlot
                          submissionClusters={props.submissionClusters}
                            genomeMetadata={props.genomeMetadata}
                          genomeOrfs={props.genomeOrfs}
                        />
                      )}
                    </Col>
                    <Col span={16}>
                      {props.metadataLoadingStatus ||
                      props.clustersLoadingStatus ? (
                        <Skeleton active />
                      ) : (
                        <GenomeMetadataTable
                          resultId={props.resultId}
                          submissionClusters={props.submissionClusters}
                          genomeMetadata={props.genomeMetadata}
                        />
                      )}
                    </Col>
                  </Row>
                </Card>
                <Card id="results" bordered={false}>
                  <Divider orientation="right">
                    <YuqueFilled style={{ marginRight: 10 }} />
                    PRISM Results
                  </Divider>
                  <Card bordered={false}>
                    {props.clustersLoadingStatus ? (
                      <Skeleton active={props.clustersLoadingStatus} />
                    ) : (
                      <PrismResult
                        submissionClusters={props.submissionClusters}
                      />
                    )}
                  </Card>
                </Card>
                <Card id="contig-stats" bordered={false}>
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Contig QA
                  </Divider>
                  {props.metadataLoadingStatus ? (
                    <Skeleton active={props.metadataLoadingStatus} />
                  ) : (
                    props.genomeMetadata && (
                      <ContigTable genomeMetadata={props.genomeMetadata} />
                    )
                  )}
                </Card>
              </Card>
            </Space>
          </Content>
          <Sider id="table-of-contents" style={{ backgroundColor: 'white' }}>
            <Card bordered={false}>
              {props.metadataLoadingStatus ? (
                <Skeleton active />
              ) : (
                <PrismTableOfContents genomeMetadata={props.genomeMetadata} />
              )}
            </Card>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

PrismPassport.propTypes = {
  history: PropTypes.object,
  submissionId: PropTypes.any,
  metadataLoadingStatus: PropTypes.bool,
  orfsLoadingStatus: PropTypes.bool,
  clustersLoadingStatus: PropTypes.bool,
  genomeOrfs: PropTypes.array,
  genomeMetadata: PropTypes.object,
  submissionClusters: PropTypes.array,
  resultId: PropTypes.string,
};

export default withRouter(memo(PrismPassport));
