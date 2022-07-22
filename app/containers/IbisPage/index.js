import React, { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Card, Layout, Empty, Button } from 'antd';
import {
  makeSelectResponse,
  makeSelectLoadingResults,
} from '../../data/fastapi/selectors';
import Domain from '../../components/Genomics/Domain';
import { loadIbisResponse } from '../../data/fastapi/actions';
import reducer from '../../data/fastapi/reducer';
import saga from '../../data/fastapi/saga';

const { Content, Sider, Header, Footer } = Layout;
// const { Search } = Input;
const { TextArea } = Input;

const key = 'ibis';
/* eslint-disable react/no-array-index-key */
export function Ibis() {
  const { inputSeq } = useParams();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  // Instantiate New State Variables
  // eslint-disable-next-line no-unused-vars
  const [textSeq, setTextSeq] = useState();
  const [domains, setDomains] = useState();

  // Fetch a response when new textSeq is set
  useEffect(() => {
    dispatch(loadIbisResponse(textSeq));
    return undefined;
  }, [textSeq]);

  // Get the default response value
  const selectResponse = makeSelectResponse();
  const response = useSelector(selectResponse);
  const selectLoading = makeSelectLoadingResults();
  const loading = useSelector(selectLoading);

  // When store has a new response value that exists/not false, create the domains
  useEffect(() => {
    if (response.summary) {
      setDomains(
        response.summary.map((domain, index) => (
          <Domain
            key={index}
            domainName={domain.label.toUpperCase()}
            domainStart={domain.start}
            domainStop={domain.stop}
            domainDescription="Foo"
            enumType={domain.enum}
            prismName={domain.label.toUpperCase()}
          />
        )),
      );
    }
  }, [response]);
  return (
    <div>
      <Helmet>
        <title>Mucho Gusto</title>
        <meta name="description" content="Ibis Pipeline Demo Front-End" />
      </Helmet>
      <Layout>
        <Header style={{ backgroundColor: 'white' }} />
        <Layout>
          <Sider style={{ backgroundColor: 'white' }} />
          <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
            <h1>Ibis Demo</h1>
            <Card title="Input Sequence">
              {
                // Automatically fill out the search with the address. On click fetch response.
              }
              {/*        <Search
                placeholder="Input an Amino Acid Sequences"
                enterButton="Get Biosynthetic Annotations"
                size="large"
                loading={loading}
                defaultValue={inputSeq}
                onSearch={v => setTextSeq(v)}
              /> */}
              <TextArea
                placeholder="Input an Amino Acid Sequences"
                autoSize
                size="large"
                defaultValue={inputSeq}
              />
              <Button
                onClick={() => loading}
                type="primary"
                loading={loading}
                icon={<SearchOutlined />}
              >
                Search for Biosynthetic Annotation
              </Button>
            </Card>
            <Card title="Results">
              {!!response.summary && response.summary.length > 0 ? (
                domains
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>
          </Content>
          <Sider style={{ backgroundColor: 'white' }} />
        </Layout>
        <Footer style={{ backgroundColor: 'white' }} />
      </Layout>
    </div>
  );
}

export default withRouter(memo(Ibis));
