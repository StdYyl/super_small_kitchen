import { requested } from './axiosed';

// 获取全部行政区划数据（树形结构）
export async function getDistrictList() {
  let res = await requested('api/cgi/map/getDistrictTree')
  return res.data.body;
}
// 搜索行政区域  locationToAddress
export async function getCityList() {
  let res = await requested('/map/cityList')
  return res.data.body;
}
// 坐标转换
export async function locationToAddress(lat, lng) {
  let res = await requested(`/map/locationToAddress?latitude=${lat}&longitude=${lng}`)
  return res.data.body;
}
