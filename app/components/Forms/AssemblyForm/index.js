import React, { useState, memo } from 'react';
import { Button, Card, Form, message, Row, Select, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TaxonomySearch from '../../../containers/TaxonomySearch';
import { put } from '../../../utils/axios';
const { Option } = Select;

// eslint-disable-next-line no-unused-vars
function AssemblyForm(props) {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const uploadUrl =
    'http://magarveylab-computational.mcmaster.ca/agave/api/submission_genome/';
  const uploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: true,
    fileList,
    action: uploadUrl,
    beforeUpload: file => {
      setFileList([...fileList, file]);
      return false;
    },
    customRequest: options => {
      put(options, localStorage.token);
    },
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  const handleUpload = info => {
    const { status } = info.file;
    if (status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      setUploading(false);
      message
        .success(
          `${info.file.name} file uploaded successfully. Job ID: ${
            info.file.response.uuid
          }`,
        )
        // eslint-disable-next-line no-console
        .then(r => console.log(r));
      // Add file to upload list with URL for UUID
      const newFileList = fileList.slice(-2);
      const { file } = info;
      file.name = `${file.name} - Job ID: ${file.response.uuid}`;
      file.url = file.response.uuid;
      newFileList.push(file);
      setFileList(newFileList);
    } else if (status === 'error') {
      setUploading(false);
      message
        .error(`${info.file.name} file upload failed.`)
        // eslint-disable-next-line no-console
        .then(r => console.log(r));
    }
  };
  return (
    <Card
      type="inner"
      title="Submission Form"
      style={{ backgroundColor: '#fff' }}
    >
      <Space direction="vertical" align="middle">
        <Form
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item
            label="Taxonomy ID"
            name="tax_id"
            rules={[{ required: true }]}
          >
            <TaxonomySearch onSelect={(value, options) => options.taxonomyid} />
          </Form.Item>
          <Form.Item
            label="Sequencing Technique"
            name="seq_tech"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 300 }}>
              <Option value="abi">ABI3730</Option>
              <Option value="sanger">Sanger</Option>
              <Option value="454">454</Option>
              <Option value="illumina">Illumina</Option>
              <Option value="gaii">Illumina GAII</Option>
              <Option value="gaiix">Illumina GAIIx</Option>
              <Option value="hiseq">Illumina HiSeq</Option>
              <Option value="miniseq">Illumina MiniSeq</Option>
              <Option value="miseq">Illumina MiSeq</Option>
              <Option value="nextseq">Illumina NextSeq</Option>
              <Option value="novaseq">Illumina NovaSeq</Option>
              <Option value="iontorrent">IonTorrent</Option>
              <Option value="nanopore">Oxford Nanopore</Option>
              <Option value="gridion">Oxford Nanopore GridION</Option>
              <Option value="minION">Oxford Nanopore MinION</Option>
              <Option value="promethion">Oxford Nanopore PromethION</Option>
              <Option value="pacbio">PacBio</Option>
              <Option value="pb-rs">PacBio RS</Option>
              <Option value="pb-rsii">PacBio RSII</Option>
              <Option value="pb-sql">PacBio Sequel</Option>
              <Option value="helicos">Helicos</Option>
              <Option value="solid">SOLiD</Option>
              <Option value="complete">Complete Genomics</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="FASTQ Upload"
            name="upload"
            rules={[{ required: true }]}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="Submit">
            <Row align="center">
              <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? 'Uploading' : 'Submit'}
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
}

export default memo(AssemblyForm);
