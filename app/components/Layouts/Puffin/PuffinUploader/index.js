import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Row, Typography, Space, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Dragger } = Upload;
function PuffinUploader(props) {
  return (
    <Card style={{ backgroundColor: 'white' }} bordered={false}>
      <Row type="flex" justify="center" align="middle">
        <Col span={2} />
        <Col span={18}>
          <Card
            style={{ backgroundColor: 'white', minHeight: '40vh' }}
            bordered={false}
          >
            <Title style={{ color: 'black' }}> Getting Started</Title>
            <Space direction="vertical" size={35}>
              <Text>
                Upload a bacterial genome to our servers for immediate
                processing. Please be considerate when uploading multiple
                genomes as there are limits slots available. Be sure your genome
                file is FASTA formatted. GenBank is currently not supported.
                When submitted you will recieve a job ID to retrieve your
                results.
              </Text>
              <Row justify="center">
                <Col span={20}>
                  <Dragger style={{ minHeight: '30vh' }} {...props.uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag FASTA file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </Dragger>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

PuffinUploader.propTypes = {
  history: PropTypes.object,
  uploadProps: PropTypes.object,
};

export default memo(PuffinUploader);
