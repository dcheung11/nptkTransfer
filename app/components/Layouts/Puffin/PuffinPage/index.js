import React, { memo } from 'react';
import { Divider, Layout } from 'antd';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import LandingFooter from '../../Footer';
import styles from './styles.less';
import PuffinDescription from '../PuffinDescriptionDiv';
import PuffinUpload from '../../../../containers/PuffinUploadDiv';
import PuffinBanner from '../../../../../public/images/puffin-banner.png';
import LogoutHeader from '../../../../containers/LogoutHeader';
import PuffinSearch from '../PuffinSearch';

const { Content } = Layout;

function PuffinPage(props) {
  return (
    <div>
      <Helmet>
        <title>Puffin</title>
      </Helmet>
      <Layout style={{ minHeight: '100vh' }}>
        <LogoutHeader />
        <Content>
          <div id="puffin-banner">
            <img
              src={PuffinBanner}
              alt="puffins"
              className={styles.puffinBanner}
            />
          </div>
          <div id="about">
            <PuffinDescription />
          </div>
          <div id="upload">
            <PuffinUpload />
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

PuffinPage.propTypes = {
  history: PropTypes.object,
};

export default memo(PuffinPage);
