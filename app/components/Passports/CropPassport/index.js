import React, { memo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  Skeleton,
  Card,
  Table,
  Typography,
  Layout,
  Row,
  Col,
  Space,
  Divider,
  Descriptions,
} from 'antd';
import { Helmet } from 'react-helmet';
import { ArrowLeftOutlined, ProfileOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import LogoutHeader from '../../../containers/LogoutHeader';
import PassportTypeIcon from '../../Iconography/PassportTypeIcon';
import { capitalizeFirstLetter } from '../../../utils/texthelper';
import CropImage from '../../ImageWrappers/CropImage';
const { Sider, Content } = Layout;
const { Title, Link } = Typography;

function CropPassport(props) {
  function createPestTable(k, v) {
    const dataSource = Object.values(v);
    const columns = [
      {
        title: 'Name',
        dataIndex: 'common_name',
        key: 'common_name',
      },
      {
        title: 'Pathogen/Pest Name',
        dataIndex: 'pest_names',
        key: 'pest_names',
        render: pids => {
          const newItem = pids.join(', ');
          return newItem;
        },
      },
      {
        title: 'Known Biopesticides',
        dataIndex: 'taxonomy_ids',
        key: 'taxonomy_ids',
        render: tids =>
          tids.map((x, idx) => (
            <Link
              onClick={() => props.history.push(`/apps/taxonomy/results/${x}`)}
              key={uuidv4()}
            >{` ${x}${!(idx === tids.length - 1) ? ',' : ''}`}</Link>
          )),
      },
    ];

    return (
      <Card key={uuidv4()} bordered={false}>
        <Divider orientation="right">
          <ProfileOutlined style={{ marginRight: 10 }} />
          {capitalizeFirstLetter(k)} Diseases
        </Divider>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    );
  }
  return (
    <div>
      <Helmet>
        <title> {props.cropName} - Crop Passport</title>
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
                  onClick={() => props.history.push('/apps/crops')}
                />
              </Col>
            </Row>
          </Sider>
          <Content id="passport-info" style={{ backgroundColor: 'white' }}>
            <Space direction="vertical" align="center">
              <Card bordered={false}>
                <Card id="passport-header-section" bordered={false}>
                  <Row>
                    <PassportTypeIcon passportType="crop" />
                    <Title>Crop Passport: {props.cropName} </Title>
                  </Row>
                </Card>
                <Card
                  id="passport-details"
                  bordered={false}
                  style={{ backgroundColor: 'white', minWidth: 1000 }}
                >
                  <Divider orientation="right">
                    <ProfileOutlined style={{ marginRight: 10 }} />
                    Summary
                  </Divider>
                  <Card>
                    <Space align="center">
                      <CropImage cropId={props.cropId} width={256} />
                      {props.cropDetailLoading ||
                      props.cropMetagenomicLoading ||
                      props.diseaseLoading ? (
                          <Skeleton active />
                        ) : (
                          !!props.cropName &&
                        !!props.cropId + 1 &&
                        !!props.cropMetadata &&
                        !!props.diseaseMetadata &&
                        !!props.cropMetagenomic &&
                        !!props.cropMetagenomic[props.cropId] && (
                            <Descriptions bordered>
                              <Descriptions.Item label="Crop ID" span={1}>
                                {props.cropId}
                              </Descriptions.Item>
                              <Descriptions.Item label="Crop Name" span={1}>
                                {props.cropName}
                              </Descriptions.Item>
                              <Descriptions.Item label="Bacterial Diseases">
                                {(!!props.diseaseMetadata.bacterium &&
                                Object.values(props.diseaseMetadata.bacterium)
                                  .length) ||
                                0}
                              </Descriptions.Item>
                              <Descriptions.Item label="Fungal Diseases">
                                {(!!props.diseaseMetadata.fungus &&
                                Object.values(props.diseaseMetadata.fungus)
                                  .length) ||
                                0}
                              </Descriptions.Item>
                              <Descriptions.Item label="Insect Diseases">
                                {(!!props.diseaseMetadata.insect &&
                                Object.values(props.diseaseMetadata.insect)
                                  .length) ||
                                0}
                              </Descriptions.Item>
                              <Descriptions.Item label="Nematode Diseases">
                                {(!!props.diseaseMetadata.nematode &&
                                Object.values(props.diseaseMetadata.nematode)
                                  .length) ||
                                0}
                              </Descriptions.Item>
                              <Descriptions.Item label="Viral Diseases">
                                {(!!props.diseaseMetadata.virus &&
                                Object.values(props.diseaseMetadata.virus)
                                  .length) ||
                                0}
                              </Descriptions.Item>
                              <Descriptions.Item
                                label=" Metagenomic Samples"
                                span={1}
                              >
                                {Object.values(
                                  props.cropMetagenomic[props.cropId],
                                ).length || 0}
                              </Descriptions.Item>
                              <Descriptions.Item
                                label="Predicted Symbionts"
                                span={1}
                              >
                                {0}
                              </Descriptions.Item>
                            </Descriptions>
                          )
                        )}
                    </Space>
                  </Card>

                  <Row>
                    <Card id="biopesticide-tables" bordered={false}>
                      {props.diseaseLoading && !props.diseaseMetadata ? (
                        <Skeleton active />
                      ) : (
                        !!props.diseaseMetadata &&
                        Object.entries(props.diseaseMetadata).map(([k, v]) =>
                          createPestTable(k, v),
                        )
                      )}
                    </Card>
                  </Row>
                </Card>
              </Card>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

CropPassport.propTypes = {
  history: PropTypes.object,
  cropId: PropTypes.number,
  cropName: PropTypes.string,
  cropDetailLoading: PropTypes.bool,
  cropMetadata: PropTypes.object,
  cropMetagenomic: PropTypes.object,
  cropMetagenomicLoading: PropTypes.bool,
  diseaseLoading: PropTypes.bool,
  diseaseMetadata: PropTypes.object,
};

export default withRouter(memo(CropPassport));
