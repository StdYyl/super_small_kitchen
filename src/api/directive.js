import { requested } from './axiosed';
// 管理员获取指令列表
export async function getDirectiveList() {
  var url = 'api/cgi/m/directive/select';
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个指令信息
export async function getDirective(directiveId) {
  var url = 'api/cgi/m/directive/detail';
  if (directiveId !== undefined) {
    url+=`?directiveId=${directiveId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某指令信息
export async function editDirective(form) {
  var url = 'api/cgi/m0/directive/revise';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员删除某指令
export async function delDirective(form) {
  var url = 'api/cgi/m0/directive/remove';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员创建指令
export async function addDirective(form) {
  var url = 'api/cgi/m0/directive/create';
  let res = await requested(url,'post',form);
  return res.data;
}
