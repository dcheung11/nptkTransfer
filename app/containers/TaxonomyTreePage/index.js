import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Layout, Typography, Col, Row, Spin, Menu, Divider, Tag } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Header } from 'antd/lib/layout/layout';
import LogoutHeader from '../LogoutHeader';
import LandingFooter from '../../components/Layouts/Footer';
import FilterTaxonomy from '../../components/Filters/FilterTaxonomy';
import TaxTreeMap from '../../components/TreeLike/TaxTreeMap';
import { transformData } from '../../components/TreeLike/TaxTreeMap/transformers';
import FilterTree from '../../components/Filters/FilterTree';
import rootSaga from '../../data/cactus/taxonomyTree/rootSaga';
import taxonomyTreeReducer from '../../data/cactus/taxonomyTree/reducers';
import { fetchInhouseRequested } from '../../data/cactus/taxonomyTree/actions';
import {
  makeSelectInhouseHits,
  makeSelectInhouseLoading,
} from '../../data/cactus/taxonomyTree/selectors';
import TaxonomyFormWithSubmission from '../TaxonomyFormWithSubmission';
function TaxonomyTreePage(props) {
  const { Content, Sider } = Layout;
  const { Title } = Typography;

  // API Get Request
  const key = 'inhouseData';
  // Fetch Inhouse Data
  useInjectSaga({ key, saga: rootSaga });
  useInjectReducer({ key, reducer: taxonomyTreeReducer });
  const [inhouseData, setInhouseData] = useState({
    error: false,
    loading: false,
    inhouseData: [],
  });
  const dispatch = useDispatch();

  // Selectors
  const selectInhouseLoading = makeSelectInhouseLoading();
  const inhouseLoading = useSelector(selectInhouseLoading);

  const selectInhouse = makeSelectInhouseHits();
  const inhouse = useSelector(selectInhouse);

  let taxData = require('./cachedInhouseData.json');

  // Taxonomy Filters Variables
  const [filteringData, setFilteringData] = useState({});
  const [selected, setSelected] = useState([]);
  const [selectedDatasets, setSelectedDatasets] = useState([]);

  const [rawData, setRawData] = useState(taxData);
  const [data, setData] = useState(transformData(rawData));

  // Choose Option Variables
  const [option, setOption] = useState('treemap');

  // Visual Filter Variables
  const [showDataFilter, setShowDataFilter] = useState(false);
  const [depth, setDepth] = useState(1);
  const [showVisualFilter, setShowVisualFilter] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [nodeColor, setNodeColor] = useState('grey');
  const [theme, setTheme] = useState('');

  // Dataset Filter Variables
  const [showDataFilterB, setShowDataFilterB] = useState(false);

  // Taxonomy Form Variables
  const [showTaxonomyForm, setShowTaxonomyForm] = useState(false);

  // Change the request data if there is a change in the API
  useEffect(() => {
    setRawData(taxData);
  }, [inhouse]);

  useEffect(() => {
    setData(transformData(rawData));
  }, [rawData]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const refreshButton = () => {
    dispatch(
      fetchInhouseRequested({
        inhouseData,
        bearerToken: localStorage.token,
      }),
    );
    taxData = JSON.parse(JSON.stringify(inhouse));
  };

  const onClickMenu = e => {
    if (e.key === 'treemap' || e.key === 'sunburst') {
      setOption(e.key);
    } else if (e.key === 'showTaxonomyFilter') {
      setShowDataFilter(true);
    } else if (e.key === 'showTreeFilter') {
      setShowVisualFilter(true);
    } else if (e.key === 'showAddForm') {
      setShowTaxonomyForm(true);
    } else if (e.key === 'refresh') {
      refreshButton();
    }
  };

  const taxTreeMap = (
    <TaxTreeMap
      data={data}
      depth={depth}
      showLabel={showLabel}
      option={option}
      selected={selected}
      setSelected={setSelected}
      // drawerData={drawerData}
      // setDrawerData={setDrawerData}
      theme={theme}
      // onEvents={onEvents}
    />
  );

  return (
    <div>
      <Helmet>
        <title> Taxonomy Tree</title>
        <meta name="description" content="Portal for Toolkit Selection" />
      </Helmet>
      <Layout
        style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%' }}
      >
        <LogoutHeader />
        <Header
          style={{
            padding: 24,
            background: '#323232',
            minHeight: 100,
          }}
        >
          <Row>
            <Col span={2}>
              <ArrowLeftOutlined
                style={{
                  color: 'white',
                  fontSize: '32px',
                }}
                onClick={() => props.history.push('/apps')}
              />
            </Col>

            <Col>
              <Title style={{ color: 'white', fontSize: '48px' }}>
                Taxonomy Database
              </Title>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Content style={{ padding: '50px 50px' }}>
            <Layout style={{ background: '#fff', padding: '24px 0' }}>
              <Content>
                <>
                  <Spin
                    indicator={antIcon}
                    tip="Fetching Data..."
                    spinning={inhouseLoading}
                  >
                    {taxTreeMap}
                  </Spin>

                  <FilterTaxonomy
                    showDataFilter={showDataFilter}
                    setShowDataFilter={setShowDataFilter}
                    filteringData={filteringData}
                    setFilteringData={setFilteringData}
                    rawData={rawData}
                    setRawData={setRawData}
                    data={data}
                    setData={setData}
                    nodeColor={nodeColor}
                    setNodeColor={setNodeColor}
                  />
                  <FilterTree
                    showVisualFilter={showVisualFilter}
                    setShowVisualFilter={setShowVisualFilter}
                    depth={depth}
                    setDepth={setDepth}
                    showLabel={showLabel}
                    setShowLabel={setShowLabel}
                    nodeColor={nodeColor}
                    setNodeColor={setNodeColor}
                    theme={theme}
                    setTheme={setTheme}
                    option={option}
                  />
                  <TaxonomyFormWithSubmission
                    showTaxonomyForm={showTaxonomyForm}
                    setShowTaxonomyForm={setShowTaxonomyForm}
                  />
                </>
              </Content>
              <Sider
                style={{ background: '#fff', padding: '24px 0' }}
                width={200}
                collapsible
              >
                <Menu
                  mode="inline"
                  theme="light"
                  style={{
                    height: '100%',
                  }}
                  onClick={onClickMenu}
                  defaultSelectedKeys={['treemap']}
                >
                  <Menu.Item />
                  <Menu.Divider>div</Menu.Divider>

                  <Menu.SubMenu title="Display Type">
                    <Menu.Item key="treemap">Treemap</Menu.Item>
                    <Menu.Item key="sunburst">Sunburst</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu title="Filters">
                    <Menu.Item key="showTaxonomyFilter">Data Filters</Menu.Item>

                    <Menu.Item key="showTreeFilter"> Visual Filters </Menu.Item>
                  </Menu.SubMenu>
                  <Menu.SubMenu title="Options">
                    <Menu.Item key="showAddForm">Add Node</Menu.Item>
                    <Menu.Item key="refresh">Refresh Data</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.Divider />
                </Menu>
              </Sider>
            </Layout>
          </Content>
          <LandingFooter color="black" />
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(memo(TaxonomyTreePage));
