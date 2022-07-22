import React, { memo, useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography,
  Divider,
  Anchor,
  Button,
} from 'antd';
import {
  ArrowLeftOutlined,
  ControlOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import MicroWellPlate from '../../ImageWrappers/MicroWellPlate';
import LogoutHeader from '../../../containers/LogoutHeader';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import FilterableMassSpectrumChromatogram from '../../Metabolomics/FilterableMassSpectrumChromatogram';
import ExtractSmallMoleculeTable from '../../Tables/ExtractSmallMoleculeTable';
import ExtractMetadata from '../../Metadata/ExtractMetadata';
import FilterMicroWellPlate from '../../Filters/FilterMicroWellPlate';
const { Sider, Content } = Layout;
const { Title } = Typography;
const { Link } = Anchor;

function MicroWellPlatePassport(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  /* Intensity Scaling */
  const maxIntensity = Math.max(
    ...props.uniquePeaks.map(x => parseFloat(x.intensity)),
  );

  /* MS1 Sorting */
  const rtSortedPeaks = [...props.uniquePeaks].sort((a, b) =>
    a.rt > b.rt ? 1 : -1,
  );

  /* MS2 Sorting */
  const sortedMs2Ions = props.ms2Peaks
    .map(x => ({ ...x, maple_peak_id: x.ms1_peak }))
    .sort((a, b) => (a.rt > b.rt ? 1 : -1));

  /* Activity Filtering */
  const [selectedActivities, setSelectedActivities] = useState([]);

  /* Bioassay Shading */
  const [selectedBioAssay, setSelectedBioAssay] = useState('default');
  const [selectedShadingKey, setSelectedShadingKey] = useState('default');
  const assayKeys = new Map();
  // eslint-disable-next-line array-callback-return
  Object.values(props.plateWells).map(well => {
    const assays =
      !!well.microwell_metadata && !!well.microwell_metadata.assay_data
        ? well.microwell_metadata.assay_data
        : [];
    // eslint-disable-next-line array-callback-return
    assays.map(assay => {
      const ignoreKeys = ['assay_id', 'supplier_synonym', 'type'];
      const allKeys = Object.keys(assay).filter(x => !ignoreKeys.includes(x));
      if (assayKeys[assay.type]) {
        allKeys.map(x => assayKeys[assay.type].add(x));
      } else {
        assayKeys[assay.type] = new Set(allKeys);
      }
    });
  });

  return (
    <div>
      <Helmet>
        <title> {props.plateId} - MicroWell Plate Passport</title>
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
                  onClick={() => props.history.push('/apps/plate')}
                />
              </Col>
            </Row>
          </Sider>
          <Content id="passport-info" style={{ backgroundColor: 'white' }}>
            <Space direction="vertical" align="center">
              <Card bordered={false}>
                <Card id="passport-header-section" bordered={false}>
                  <Row>
                    <PassportTypeIcon passportType="microwell" />
                    <Title>Plate Passport: {props.plateId} </Title>
                  </Row>
                </Card>
                <Card id="topDiv" bordered={false}>
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Microwell Plate Viewer
                  </Divider>
                  <Space>
                    <Card id="microWellPate" bordered={false}>
                      <Space direction="vertical">
                        <Button
                          type="primary"
                          icon={<ControlOutlined />}
                          onClick={() => {
                            setIsModalVisible(true);
                          }}
                        >
                          Filters
                        </Button>
                        <MicroWellPlate
                          plate={props.plateWells}
                          selectedActivities={selectedActivities}
                          wellClickHandler={props.wellClickHandler}
                          selectedShadingKey={selectedShadingKey}
                          selectedBioAssay={selectedBioAssay}
                          height="30vh"
                        />
                      </Space>
                    </Card>
                    <Card id="metadata" bordered={false}>
                      <ExtractMetadata
                        extractId={props.extractId}
                        activity={props.activity}
                        extractsMetadata={props.extractsMetadata}
                        cultureMetadata={props.cultureMetadata}
                      />
                    </Card>
                  </Space>
                  <Card
                    id="extractViewer"
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
                      smallMoleculeLookup={props.smallMoleculeLookup}
                      ms2Peaks={sortedMs2Ions}
                      ms2Lookup={props.ms2Lookup}
                      selectedMs1Peak={props.selectedMs1Peak}
                    />
                  </Card>
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
                      smallMolecules={Object.values(props.smallMoleculeLookup)}
                      peakLookup={Object.fromEntries(
                        new Map(
                          props.uniquePeaks.map(x => [x.maple_peak_id, x]),
                        ),
                      )}
                    />
                  </Card>
                </Card>
              </Card>
            </Space>
            <FilterMicroWellPlate
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              activityProfiles={selectedActivities}
              setActivityProfiles={setSelectedActivities}
              selectedShadingKey={selectedShadingKey}
              setSelectedShadingKey={setSelectedShadingKey}
              selectedBioAssay={selectedBioAssay}
              setSelectedBioAssay={setSelectedBioAssay}
              assayKeys={assayKeys}
            />
          </Content>
          <Sider id="table-of-contents" style={{ backgroundColor: 'white' }}>
            <Card bordered={false}>
              <Anchor>
                <Link href="#microWellPate" title="Microwell Plate Viewer" />
                <Link href="#extractViewer" title="Extract Viewer">
                  <Link href="#chromatogram" title="Chromatogram" />
                  <Link href="#massSpectrum" title="Mass Spectrum" />
                </Link>
                <Link href="#smallMolecules" title="Small Molecules" />
              </Anchor>
            </Card>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

MicroWellPlatePassport.propTypes = {
  history: PropTypes.object,
  massSpecOnEvents: PropTypes.object,
  activity: PropTypes.array,
  plateId: PropTypes.string,
  plateWells: PropTypes.object,
  wellClickHandler: PropTypes.func,
  uniquePeaks: PropTypes.array,
  chemotypeLookup: PropTypes.object,
  smallMoleculeLookup: PropTypes.object,
  extractsMetadata: PropTypes.object,
  cultureMetadata: PropTypes.object,
  extractId: PropTypes.any,
  rtMin: PropTypes.number,
  rtMax: PropTypes.number,
  uniquePeaksLoading: PropTypes.bool,
  ms2Peaks: PropTypes.array,
  ms2Lookup: PropTypes.object,
  selectedMs1Peak: PropTypes.any,
};

export default withRouter(memo(MicroWellPlatePassport));
