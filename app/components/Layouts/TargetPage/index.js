import React, { memo } from 'react';
import { Card, Layout, Tabs } from 'antd';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import TargetFigure from '../../ImageWrappers/TargetFigure';
import LogoutHeader from '../../../containers/LogoutHeader';
import TargetLegendTable from '../../Tables/TargetLegendTable';
const { Content, Sider } = Layout;
const { TabPane } = Tabs;

function FigureLandingPage(props) {
  const { targetKey } = useParams();
  return (
    <div>
      <Helmet>
        <title>Molecular Targets</title>
        <meta name="description" content="Molecular Target Figures" />
      </Helmet>
      <LogoutHeader />
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <Sider style={{ backgroundColor: 'white' }} />
        <Content>
          <Card bordered={false}>
            <Tabs defaultActiveKey={targetKey || 'plant'} centered="true">
              <TabPane tab="Plant" key="plant">
                <Card>
                  <TargetFigure target="plant" />
                  <TargetLegendTable target="plant" />
                </Card>
              </TabPane>
              <TabPane tab="Fungi" key="fungi">
                <Card>
                  <TargetFigure target="fungi" />
                  <TargetLegendTable target="fungi" />
                </Card>
              </TabPane>
              <TabPane tab="Bacteria" key="bacteria">
                <Card>
                  <TargetFigure target="bacteria" />
                  <TargetLegendTable target="bacteria" />
                </Card>
              </TabPane>
              <TabPane tab="Insect" key="insect">
                <Card>
                  <TargetFigure target="insect" />
                  <TargetLegendTable target="insect" />
                </Card>
              </TabPane>
            </Tabs>
          </Card>
        </Content>
        <Sider style={{ backgroundColor: 'white' }} />
      </Layout>
    </div>
  );
}

export default memo(FigureLandingPage);
