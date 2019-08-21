import { requested } from './axiosed';

// 获取OSS图片上传凭证
export async function getImageOssToken(path) {
  var url = 'api/cgi/store/imageOssToken';
  if (path !== undefined) {
    url += '?path=' + path;
  }
  let res = await requested(url);
  return res.data.body;
}

//上传图片
export async function uploadImage(form) {
  var url = 'https://umoss-cxc.oss-cn-shanghai.aliyuncs.com/';
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    }
  };
  let res = await requested(url, 'post', form, config);
  return res.data.body;
}
