import React, { memo } from 'react';
import { Divider, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LandingFooter from '../../Footer';
import styles from './styles.less';
import QuinceDescriptionDiv from '../../../Metadata/QuinceDescriptionDiv';
import QuinceKnownTable from '../../../../containers/QuinceKnownTable';
import QuinceBanner from '../../../../../public/images/quince-banner.png';
import LogoutHeader from '../../../../containers/LogoutHeader';
import PuffinSearch from '../../Puffin/PuffinSearch';

const { Content } = Layout;

function QuincePage(props) {
  return (
    <div>
      <Helmet>
        <title>Quince</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <LogoutHeader />
        <Content>
          <div id="puffin-banner">
            <img
              src={QuinceBanner}
              alt="puffins"
              className={styles.puffinBanner}
            />
          </div>
          <div id="about">
            <QuinceDescriptionDiv />
          </div>
          <div id="upload">
            <QuinceKnownTable />
          </div>
          <Divider dashed className="divStyle" />
          <div id="results">
            <PuffinSearch
              bgColor="black"
              fontColor="white"
              onSearch={queryId =>
                props.history.push(`/apps/quince/results/${queryId}`)
              }
            />
          </div>
        </Content>
        <LandingFooter color="black" />
      </Layout>
    </div>
  );
}

QuincePage.propTypes = {
  history: PropTypes.object,
};

export default memo(QuincePage);
