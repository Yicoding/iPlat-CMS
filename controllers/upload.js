const fs = require('fs');
const { cos } = require('../config');

function putFun(path) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: 'qcloudtest-1257454171',
      Region: 'ap-guangzhou',
      Key: `good/picture_${Math.random().toString().slice(-8)}.png`,
      Body: fs.createReadStream(path)
    }, function (err, data) {
      if (err) {
        console.log('err', err);
        reject(err);
      }
      console.log('data', data);
      resolve(data);
    });
  });
}

async function putObject(ctx, next) {
  try {
    const { file: { path } } = ctx.request.files;
    const data = await putFun(path);
    ctx.state.code = 0;
    ctx.state.data = data;
  } catch (err) {
    console.log('err', err);
    ctx.state.code = -1
    throw new Error(err)
  }
}


module.exports = {
  putObject
};