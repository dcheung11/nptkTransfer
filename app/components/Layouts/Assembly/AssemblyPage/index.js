import React, { memo } from 'react';
import { Divider, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LandingFooter from '../../Footer';
import styles from './styles.less';
import AssemblyDescription from '../AssemblyDescriptionDiv';
import AssemblyForm from '../AssemblySubmission';
import AssemblyBanner from '../../../../../public/images/assembly-banner.png';
import LogoutHeader from '../../../../containers/LogoutHeader';
import PuffinSearch from '../../Puffin/PuffinSearch';

const { Content } = Layout;

function AssemblyPage(props) {
  return (
    <div>
      <Helmet>
        <title>Assembly Submission</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <LogoutHeader />
        <Content>
          <div id="assembly-banner">
            <img
              src={AssemblyBanner}
              alt="sequencing"
              className={styles.puffinBanner}
            />
          </div>
          <div id="about">
            <AssemblyDescription />
          </div>
          <div id="upload">
            <AssemblyForm />
          </div>
          <Divider dashed className="divStyle" />
          <div id="results">
            <PuffinSearch
              bgColor="black"
              fontColor="white"
              onSearch={queryId =>
                props.history.push(`/apps/puffin/results/${queryId}`)
              }
            />
          </div>
        </Content>
        <LandingFooter color="black" />
      </Layout>
    </div>
  );
}

AssemblyPage.propTypes = {
  history: PropTypes.object,
};

export default memo(AssemblyPage);
