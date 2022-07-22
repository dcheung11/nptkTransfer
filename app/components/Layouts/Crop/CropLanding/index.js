import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Space, Col, Row, Typography, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CropButton from '../../../ImageWrappers/CropButton';
import LogoutHeader from '../../../../containers/LogoutHeader';
import CropBanner from '../../../../../public/images/crop-profiles-banner.png';
import styles from '../../Assembly/AssemblyPage/styles.less';
const { Title, Paragraph, Link } = Typography;
const { Content, Sider } = Layout;

function CropLanding(props) {
  const allCrops = [];
  for (let i = 0; i < 15; i++) {
    const crop = (
      <Col key={i} span={6}>
        <Space align="center">
          <Card
            onClick={() => props.history.push(`/apps/crops/results/${i}`)}
            bordered={false}
          >
            <CropButton cropId={i} showName />
          </Card>
        </Space>
      </Col>
    );
    allCrops.push(crop);
  }
  return (
    <div>
      <Helmet>
        <title>Crop Profiles</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <LogoutHeader />
          {/* Image Header */}
          <div id="crops-banner">
            <img
              src={CropBanner}
              alt="Crop Profiles"
              className={styles.puffinBanner}
            />
          </div>
          {/* Description */}
          <Card style={{ backgroundColor: 'black' }} bordered={false}>
            <Row
              style={{ minHeight: '30vh' }}
              type="flex"
              justify="center"
              align="middle"
            >
              <Col span={2}>
                <ArrowLeftOutlined
                  style={{
                    color: 'white',
                    fontSize: '32px',
                  }}
                  onClick={() => props.history.push('/apps')}
                />
              </Col>
              <Col span={18}>
                <Card
                  style={{ backgroundColor: 'black', minHeight: '20vh' }}
                  bordered={false}
                >
                  <Title style={{ color: 'white' }}> Getting Started</Title>
                  <Paragraph style={{ color: 'white' }}>
                    A repository of crop-based knowledge is below. Using a team
                    of data curators, metagenomic analyses and deep learning
                    models an extensive array of potential biopesticides are
                    suggested for different known crop diseases. Disease
                    categories include bacterial, fungal, viral, insect-based
                    and nematodal.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
          {/* CROPS */}
          <Layout>
            <Sider style={{ backgroundColor: '#f5f5f7' }} />
            <Content>
              <Card style={{ backgroundColor: '#f5f5f7' }} bordered={false}>
                <Card>
                  <Space direction="vertical" align="center">
                    <Title level={1} style={{ fontSize: 60 }}>
                      Explore our crop library.
                    </Title>
                    <Link>{`Compare Crops >`}</Link>
                    <Row>
                      <Col span={2} />
                      <Row>{allCrops}</Row>
                    </Row>
                  </Space>
                </Card>
              </Card>
            </Content>
            <Sider style={{ backgroundColor: '#f5f5f7' }} />
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}
CropLanding.propTypes = {
  history: PropTypes.object,
};
export default withRouter(memo(CropLanding));
