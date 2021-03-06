import { requested } from './axiosed';
import {fetch, post} from "./http";
// 管理员获取指令集列表
export async function getDirectiveSetList(form) {
  var url = 'api/cgi/m/directiveSet/select';
  if (form) {
    url+='?search='+form.search+'&last='+form.last+'&rows='+form.rows;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个指令集信息
export async function getDirectiveSet(directiveSetId) {
  var url = 'api/cgi/m/directiveSet/detail';
  if (directiveSetId !== undefined) {
    url+=`?directiveSetId=${directiveSetId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某指令集信息
export async function editDirectiveSet(form) {
  var url = 'api/cgi/m0/directiveSet/revise';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员删除某指令集
export async function delDirectiveSet(form) {
  var url = 'api/cgi/m0/directiveSet/remove';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员创建指令集
export async function addDirectiveSet(form) {
  var url = 'api/cgi/m0/directiveSet/create';
  let res = await requested(url,'post',form);
  return res.data;
}

export function selectDirectiveSetList(data) {
  return fetch('api/cgi/m/directiveSet/select', data);
}
