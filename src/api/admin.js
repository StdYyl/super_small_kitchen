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
//删除管理员
export async function  deleteAdmin(managerId) {
  console.log(managerId)
  let rs = await requested('api/cgi//m/manager/remove','POST',managerId)
  return rs;
}


