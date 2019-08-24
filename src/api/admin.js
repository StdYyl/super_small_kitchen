import { requested } from './axiosed'
//获取管理员列表
export function getAdminList(last=0,rows=15) {
  return requested(`api/cgi/m0/manager/select?last=${last}&rows=${rows}`);
}
// 添加管理员
export async function addAdmin(data) {
  let rs = await requested('api/cgi/m0/manager/create','POST',data)
  return rs.data;
}
//获取每个管理员的信息
export async function getAdminMes(id) {
  return await requested(`api/cgi/m/manager/detail?managerId=${id}`)
}
//修改管理员信息
export function reviseAdminMes(data) {
  return requested('/api/cgi/m0/manager/revise','POST',data)
}
//删除管理员
export async function  deleteAdmin(managerId) {
  let rs = await requested('api/cgi//m/manager/remove','POST',managerId)
  return rs;
}
//推荐位添加
export async function createRecommend(data) {
  let rs = requested('/api/cgi/m0/feature/create','POST',data)
  return rs
}
//获取推荐位信息列表
export function getRecommend() {
  return requested('/api/cgi/feature/list')
}
//删除推荐位
export async function removeRecommend(id) {
  let rs = await requested('/api/cgi/m0/feature/remove','POST',id)
}
//获取具体的推荐位信息
export function getDetailRecommend(id) {
  return requested(`/api/cgi/m/feature/detail?featureId=${id}`)
}
//修改推荐位信息
export function reviseRecommend(data) {
  return requested('/api/cgi/m0/feature/revise','POST',data)
}
