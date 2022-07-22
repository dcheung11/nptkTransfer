import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Typography,
  Layout,
  Row,
  Col,
  Space,
  Card,
  Divider,
  Button,
} from 'antd';
import { Helmet } from 'react-helmet';
import {
  ArrowLeftOutlined,
  ControlOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import LogoutHeader from '../../../containers/LogoutHeader';
import ExtractMetadata from '../../Metadata/ExtractMetadata';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import ExtractTable from '../../Tables/ExtractTable';
import FilterableMassSpectrumChromatogram from '../../Metabolomics/FilterableMassSpectrumChromatogram';
import ExtractSmallMoleculeTable from '../../Tables/ExtractSmallMoleculeTable';
import FilterMetabolomics from '../../Filters/FilterMetabolomics';
const { Title } = Typography;
const { Sider, Content } = Layout;

function ExtractPassport(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activityProfiles, setActivityProfiles] = useState([]);
  const maxIntensity = Math.max(
    ...props.peaks.map(x => parseFloat(x.intensity)),
  );
  const rtSortedPeaks = [...props.peaks].sort((a, b) => (a.rt > b.rt ? 1 : -1));
  const smallMoleculeLookup = Object.fromEntries(
    new Map(props.smallMolecules.map(x => [x.maple_peak_id, x])),
  );

  const sortedMs2Ions = props.ms2Peaks
    .map(x => ({ ...x, maple_peak_id: x.ms1_peak }))
    .sort((a, b) => (a.rt > b.rt ? 1 : -1));

  return (
    <div>
      <Helmet>
        <title> {props.extractId} - Extract Passport</title>
        <meta name="description" content="Puffin Passport" />
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
            <Space direction="vertical" align="center">
              <Card bordered={false}>
                <Card id="passport-header-section" bordered={false}>
                  <Row>
                    <PassportTypeIcon passportType="extract" />
                    <Title>Extract Passport: {props.extractId} </Title>
                  </Row>
                </Card>
                <Card
                  id="passport-details"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 100 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Summary
                  </Divider>

                  <ExtractMetadata
                    extractId={props.extractId}
                    activity={props.activity}
                    extractsMetadata={props.extractsMetadata}
                    cultureMetadata={props.cultureMetadata}
                  />
                </Card>
                <Card
                  id="Chromatogram"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 100 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Extract Viewer
                  </Divider>
                  <FilterableMassSpectrumChromatogram
                    extractId={props.extractId}
                    rtSortedPeaks={(!!rtSortedPeaks && rtSortedPeaks) || []}
                    maxIntensity={maxIntensity}
                    massSpecOnEvents={props.massSpecOnEvents}
                    rtMin={props.rtMin}
                    rtMax={props.rtMax}
                    chemotypeLookup={props.chemotypeLookup}
                    smallMoleculeLookup={smallMoleculeLookup}
                    ms2Peaks={sortedMs2Ions}
                    ms2Lookup={props.ms2Lookup}
                    selectedMs1Peak={props.selectedMs1Peak}
                  />
                </Card>
                <Button
                  type="primary"
                  icon={<ControlOutlined />}
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  Filters
                </Button>
                <Card
                  id="smallMolecules"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 100 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Confident Small Molecules
                  </Divider>
                  <ExtractSmallMoleculeTable
                    smallMolecules={props.smallMolecules}
                    activityProfiles={activityProfiles}
                    peakLookup={Object.fromEntries(
                      new Map(rtSortedPeaks.map(x => [x.maple_peak_id, x])),
                    )}
                  />
                </Card>
                <Card
                  id="allCultureExtracts"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 100 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Culture Extracts
                  </Divider>
                  <ExtractTable
                    extract={Object.values(props.extractsMetadata)}
                  />
                </Card>
              </Card>
            </Space>
            <FilterMetabolomics
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              activityProfiles={activityProfiles}
              setActivityProfiles={setActivityProfiles}
            />
          </Content>
          <Sider style={{ backgroundColor: 'white' }} />
        </Layout>
      </Layout>
    </div>
  );
}

ExtractPassport.propTypes = {
  history: PropTypes.object,
  extractId: PropTypes.any,
  activity: PropTypes.array,
  smallMolecules: PropTypes.array,
  peaks: PropTypes.array,
  rtMax: PropTypes.number,
  rtMin: PropTypes.number,
  chemotypeLookup: PropTypes.object,
  extractsMetadata: PropTypes.object,
  cultureMetadata: PropTypes.object,
  massSpecOnEvents: PropTypes.object,
  ms2Peaks: PropTypes.array,
  ms2Lookup: PropTypes.object,
  selectedMs1Peak: PropTypes.object,
};

export default withRouter(memo(ExtractPassport));
