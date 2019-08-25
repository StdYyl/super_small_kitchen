import { requested } from './axiosed';
import {fetch, post} from "./http";
// 用户获取菜谱列表
export async function getCookBookList(cookCategoryId) {
  var url = 'api/cgi/cookbook/category/list';
  if (cookCategoryId !== undefined) {
    url+='?parentId=' + cookCategoryId;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员获取某一个菜谱信息
export async function getCookBookCategory(cookCategoryId) {
  var url = 'api/cgi/m/cookbook/category/detail';
  if (cookCategoryId !== undefined) {
    url+=`?cookCategoryId=${cookCategoryId}`;
  }
  let res = await requested(url);
  return res.data.body;
}
//管理员修改某菜谱分类信息
export async function editCookBookCategory(form) {
  var url = 'api/cgi/m0/cookbook/category/revise';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员删除某菜谱分类
export async function delCookBookCategory(form) {
  var url = 'api/cgi/m0/cookbook/category/remove';
  let res = await requested(url,'post',form);
  return res.data;
}
//管理员创建菜谱分类
export async function addCookBookCategory(form) {
  var url = 'api/cgi/m0/cookbook/category/create';
  let res = await requested(url,'post',form);
  return res.data;
}

export function getCookCategoryList() {
  return fetch('api/cgi/m/cookbook/category/select');
}
