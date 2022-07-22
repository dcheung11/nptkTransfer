import axios from 'axios';

export function put(options, token) {
  const data = new FormData();
  data.append('file', options.file);
  const config = {
    headers: {
      'Content-Disposition': `attachment; filename="${options.file.name}"`,
      Authorization: `Bearer ${token}`,
    },
  };
  axios
    .put(options.action, data, config)
    .then(res => {
      options.onSuccess(res.data, options.file);
    })
    .catch(err => {
      console.log(err);
    });
}
