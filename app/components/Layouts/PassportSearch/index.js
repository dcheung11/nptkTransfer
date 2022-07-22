import React, { memo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Layout, Typography, Row, Space, Radio, Image } from 'antd';
import { Helmet } from 'react-helmet';
import LandingFooter from '../Footer';
import StatisticCounter from '../../Miscellaneous/StatisticCounter';
import TaxonomySearch from '../../../containers/TaxonomySearch';
import SmilesSearch from '../../SearchBars/SmilesSearch';
import LogoutHeader from '../../../containers/LogoutHeader';
import passportAtlasLogo from '../../../../public/images/inviand-passport-atlas.png';
import styles from './styles.less';
import ActivitySearch from '../../SearchBars/ActivitySearch';
import TargetSearch from '../../../containers/TargetSearch';
import MoleculeNameSearch from '../../SearchBars/MoleculeNameSearch';

const { Content } = Layout;
const { Title } = Typography;

function PassportSearch(props) {
  /*
  TODO: Add statistic fetching directly from database
  */
  const [searchType, setSearchType] = useState('taxonomySearch');

  function renderSearch(selectedSearchType) {
    switch (selectedSearchType) {
      case 'taxonomySearch':
        return (
          <TaxonomySearch
            enterButton
            onSelect={(value, option) =>
              props.history.push(`/apps/taxonomy/results/${option.taxonomyid}`)
            }
          />
        );
      case 'smilesSearch':
        return <SmilesSearch />;
      case 'activitySearch':
        return <ActivitySearch />;
      case 'targetSearch':
        return <TargetSearch />;
      case 'molNameSearch':
        return <MoleculeNameSearch />;
      default:
        return <span />;
    }
  }

  const onChange = e => {
    setSearchType(e.target.value);
  };
  return (
    <div>
      <Helmet>
        <title>Passport Browser</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <LogoutHeader />
        <Content className={styles.taxonomySearch}>
          <Card style={{ minHeight: '20vh', opacity: 0 }} />
          <Card
            style={{ opacity: 0.95, minHeight: '50vh', textAlign: 'center' }}
          >
            <Row
              style={{ minHeight: '50vh' }}
              type="flex"
              align="center"
              justify="middle"
            >
              <Space align="center" direction="vertical" size={50}>
                {/* <Title align="center"> NP Passport Browser</Title> */}
                <Image width={720} src={passportAtlasLogo} preview={false} />
                {renderSearch(searchType)}
                <Radio.Group onChange={onChange} value={searchType}>
                  <Radio value="taxonomySearch">Taxonomy</Radio>
                  <Radio value="smilesSearch">SMILES</Radio>
                  <Radio value="molNameSearch">Molecule Name</Radio>
                  <Radio value="activitySearch">Activity</Radio>
                  <Radio value="targetSearch">Target</Radio>
                </Radio.Group>
                <Row>
                  <Space size={50}>
                    <StatisticCounter
                      title="Genomes"
                      value={props.numGenomes}
                      delay={0}
                    />
                    <StatisticCounter
                      title="Gene Clusters"
                      value={props.numGeneClusters}
                      delay={0.1}
                    />
                    <StatisticCounter
                      title="Extracts"
                      value={props.numExtracts}
                      delay={0.2}
                    />
                    <StatisticCounter
                      title="Small Molecules"
                      value={props.numMolecules}
                      delay={0.3}
                    />
                  </Space>
                </Row>
              </Space>
            </Row>
          </Card>
          <Card style={{ minHeight: '10vh', opacity: 0 }} />
        </Content>
        <LandingFooter color="black" />
      </Layout>
    </div>
  );
}

PassportSearch.propTypes = {
  history: PropTypes.object,
};

export default withRouter(memo(PassportSearch));
