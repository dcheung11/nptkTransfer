import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import {
  Anchor,
  Layout,
  Typography,
  Col,
  Card,
  Row,
  Divider,
  Space,
  Skeleton,
  Button,
} from 'antd';
import {
  ArrowLeftOutlined,
  BranchesOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import LogoutHeader from '../../../containers/LogoutHeader';
import LandingFooter from '../../Layouts/Footer';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import TaxonomyMetadata from '../../Metadata/TaxonomyMetadata';
import TaxonomyTreev2 from '../../TreeLike/TaxonomyTreev2';
import ListMolecule from '../../Metadata/ListMolecule';
import { DnaIcon, MolIcon } from '../../Iconography/Icons';
import CultureExtractTable from '../../Tables/CultureExtractTable';
import PrismTable from '../../Tables/PrismTable';
import AnalogChemotypeTabs from '../../../containers/AnalogChemotypeTabs';
import CultureFormWithSubmission from '../../../containers/CultureFormWithSubmission';

const { Title } = Typography;
const { Content, Sider } = Layout;
const { Link } = Anchor;

function TaxonomyPassport(props) {
  const [showCultureForm, setShowCultureForm] = useState(false);
  return (
    <div>
      <Helmet>
        <title>{props.name} - Passport</title>
        <meta name="description" content="Portal for Toolkit Selection" />
      </Helmet>
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <LogoutHeader />
        <Layout>
          <Sider
            style={{ backgroundColor: 'white' }}
            breakpoint="lg"
            collapedWidth="0"
          >
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
                  onClick={() => props.history.push('/apps/passport')}
                />
              </Col>
            </Row>
          </Sider>
          <Content style={{ backgroundColor: 'white' }}>
            <Space>
              <Col id="passport">
                <Card bordered={false}>
                  <Card id="passport-header-section" bordered={false}>
                    <Row>
                      <PassportTypeIcon passportType="taxonomy" />
                      <Title>
                        Entry: <i>{props.name}</i>
                      </Title>
                    </Row>
                  </Card>
                  <Card id="passport-details" bordered={false}>
                    <Divider orientation="right">
                      <ProfileOutlined style={{ marginRight: 10 }} />
                      Passport Details
                    </Divider>
                    <Row align="center">
                      <Col span={1} />
                      <Card style={{ width: '100%' }} bordered={false}>
                        {props.taxonomyLoading ? (
                          <Skeleton active />
                        ) : (
                          <TaxonomyMetadata
                            style={{ align: 'center' }}
                            rank={props.rank}
                            tax={props.tax}
                            ncbiId={props.ncbiId}
                          />
                        )}
                      </Card>
                      <Col span={1} />
                    </Row>
                  </Card>
                  <Card id="cultures" bordered={false}>
                    <Divider orientation="right">
                      <ProfileOutlined style={{ marginRight: 10 }} />
                      Culture and Extracts
                    </Divider>
                    <Row>
                      {props.permissions.includes('create:culture') && (
                        <Button
                          onClick={() => setShowCultureForm(true)}
                          type="primary"
                        >
                          Create New Culture
                        </Button>
                      )}
                    </Row>
                    <br />
                    <CultureFormWithSubmission
                      showCultureForm={showCultureForm}
                      taxonomyId={props.taxonomyId}
                      cultureMedia={props.cultureMedia}
                      experimentalClasses={props.experimentalClasses}
                      organizationIds={props.organizationIds}
                      cultureForm={props.cultureForm}
                      setShowCultureForm={setShowCultureForm}
                      permissions={props.permissions}
                    />
                    <Row>
                      <Col span={24}>
                        {props.cultureLoading ? (
                          <Skeleton active />
                        ) : (
                          <CultureExtractTable
                            culture={props.cultureExtracts}
                            permissions={props.permissions}
                            extractionMethods={props.extractionMethods}
                            extractionSolvents={props.extractionSolvents}
                            tax={props.tax}
                          />
                        )}
                      </Col>
                    </Row>
                  </Card>
                  <Card id="known-small-molecules" bordered={false}>
                    <Divider orientation="right">
                      <MolIcon style={{ marginRight: 10 }} />
                      Known Molecules
                    </Divider>
                    {props.moleculeLoading ? (
                      <Skeleton active />
                    ) : (
                      <ListMolecule smallMolecules={props.taxMolecules} />
                    )}
                  </Card>
                  <Card id="predicted-small-molecules" bordered={false}>
                    <Divider orientation="right">
                      <ProfileOutlined style={{ marginRight: 10 }} />
                      Predicted Molecules
                    </Divider>
                    <AnalogChemotypeTabs
                      metabologenomicHits={props.metabologenomicHits}
                    />
                  </Card>
                  <Card id="genomes" bordered={false}>
                    <Divider orientation="right">
                      <DnaIcon style={{ marginRight: 10 }} />
                      Genomes
                    </Divider>
                    {props.genomeLoading ? (
                      <Skeleton active />
                    ) : (
                      <PrismTable genomeStats={props.genomeStats} />
                    )}
                  </Card>
                  <Card id="child-nodes" bordered={false}>
                    <Divider orientation="right">
                      <BranchesOutlined style={{ marginRight: 10 }} />
                      Taxonomy Tree
                    </Divider>
                    {!props.childLoading && !props.parentLoading ? (
                      <TaxonomyTreev2
                        parentNodes={props.parentNodes}
                        childNodes={props.childNodes}
                      />
                    ) : (
                      <Skeleton active />
                    )}
                  </Card>
                </Card>
              </Col>
            </Space>
          </Content>
          <Sider
            id="table-of-contents"
            style={{ backgroundColor: 'white' }}
            breakpoint="lg"
            collapedWidth="0"
          >
            <Card bordered={false}>
              <Anchor>
                {props.passportSections.map(section => (
                  <Link
                    key={`link-${section.title}`}
                    href={section.href}
                    title={section.title}
                  />
                ))}
              </Anchor>
            </Card>
          </Sider>
        </Layout>
        <LandingFooter color="black" />
      </Layout>
    </div>
  );
}

TaxonomyPassport.propTypes = {
  history: PropTypes.object,
  taxonomyId: PropTypes.string,
  childLoading: PropTypes.bool,
  childNodes: PropTypes.array,
  cultureLoading: PropTypes.bool,
  cultureExtracts: PropTypes.array,
  cultureMedia: PropTypes.array,
  cultureForm: PropTypes.object,
  experimentalClasses: PropTypes.array,
  extractionSolvents: PropTypes.array,
  extractionMethods: PropTypes.array,
  genomeLoading: PropTypes.bool,
  genomeStats: PropTypes.array,
  moleculeLoading: PropTypes.bool,
  name: PropTypes.string,
  ncbiId: PropTypes.number,
  organizationIds: PropTypes.array,
  parentLoading: PropTypes.bool,
  parentNodes: PropTypes.array,
  passportSections: PropTypes.array,
  rank: PropTypes.string,
  tax: PropTypes.object,
  taxMolecules: PropTypes.array,
  taxonomyLoading: PropTypes.bool,
  metabologenomicHits: PropTypes.array,
  permissions: PropTypes.array,
};

export default withRouter(memo(TaxonomyPassport));
