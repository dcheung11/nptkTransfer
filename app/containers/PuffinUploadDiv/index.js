import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { put } from '../../utils/axios';
import PuffinUploader from '../../components/Layouts/Puffin/PuffinUploader';

function PuffinUploadDiv() {
  /*
 Setup Upload Portal
  */
  const [fileList, setFileList] = useState([]);
  const uploadUrl =
    'http://magarveylab-computational.mcmaster.ca/agave/api/submission_genome/';
  const uploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: true,
    fileList,
    action: uploadUrl,
    beforeUpload: file => {
      // Validate not uploading unserializable object to AgaveDB
      if (file.type.match('image/')) {
        message.error('You cannot upload images!');
        return false;
      }
      if (file.type.match('application/')) {
        message.error('You cannot upload application type files!');
        return false;
      }
      if (file.type.match('audio/')) {
        message.error('You cannot upload audio files!');
        return false;
      }
      if (file.type.match('video/')) {
        message.error('You cannot upload video files!');
        return false;
      }
      return true;
    },
    customRequest: options => {
      // Put Request via Axios to AgaveDB
      put(options, localStorage.token);
    },
    onChange: info => {
      const { status } = info.file;
      if (status !== 'uploading') {
        // eslint-disable-next-line no-console
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
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
        message
          .error(`${info.file.name} file upload failed.`)
          // eslint-disable-next-line no-console
          .then(r => console.log(r));
      }
    },
  };

  return <PuffinUploader uploadProps={uploadProps} />;
}

PuffinUploadDiv.propTypes = {
  history: PropTypes.object,
};

export default memo(PuffinUploadDiv);
